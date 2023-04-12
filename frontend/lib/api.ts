export class RequestError extends Error {
	responseData: any
	status: number

	constructor(message: string, status: number, responseData?: any) {
		super(message)
		this.responseData = responseData
		this.status = status
	}

	getResponseData() {
		return this.responseData
	}

	getStatus() {
		return this.status
	}
}

const apiPath = 'http://localhost:8080/api' // TODO: Move to env or config

export const apiGet = async (path: string) => {
	const response = await fetch(apiPath + path, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return handleResponse(response)
}

export const apiPost = async (path: string, body: any) => {
	const response = await fetch(apiPath + path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	return handleResponse(response)
}

const handleResponse = async (response: Response) => {
	if (response.status < 200 || response.status >= 300) {
		const json = await response.json()
		throw new RequestError(response.statusText, response.status, json)
	}

	return await response.json()
}
