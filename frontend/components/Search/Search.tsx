import { useCallback, useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'

export interface SearchInterface {
	setSearch: (search: boolean) => void
}

const searchHook = (searchValue: string) => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	useCallback(async () => {
		setError(null)
		setLoading(true)
		try {
			const response = await fetch(`http://localhost:8080/api/search/song`, {
				method: 'POST',
				body: JSON.stringify({ name: searchValue, amount: 3 })
			})
			const data = await response.json()
			setData(data)
		} catch (e: any) {
			setError(e)
		}
		setLoading(false)
	}, [searchValue])

	return { data, error, loading }
}

const Search = ({ setSearch }: SearchInterface) => {
	const [searchText, setSearchText] = useState('')
	const { data, error, loading } = searchHook(searchText)

	useEffect(() => {
		console.log('-------')
		console.log(data)
		console.log(error)
		console.log(loading)
	}, [data, error, loading])

	return (
		<div>
			<SearchBar
				setSearch={setSearch}
				searchText={searchText}
				setSearchText={setSearchText}
			/>
		</div>
	)
}

export default Search
