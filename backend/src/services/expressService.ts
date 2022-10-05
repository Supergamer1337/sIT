import express, { Express } from 'express'

export const createServer = async () => {
	const app = express()

	setupRoutes(app)

	return app
}

const setupRoutes = async (app: Express) => {
	app.get('/', (req, res) => {
		res.send('Hello World!')
	})
}
