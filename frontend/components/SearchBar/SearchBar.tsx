import { useRef } from 'react'
import styles from './SearchBar.module.css'
export interface SearchBarInterface {
	setSearch: (search: boolean) => void
	setSearchText: (searchText: string) => void
	searchText: string
}

const SearchBar = ({
	setSearch,
	searchText,
	setSearchText
}: SearchBarInterface) => {
	const searchRef = useRef<HTMLInputElement>(null)

	const updateSearch = () => {
		if (searchText !== '' || document.activeElement === searchRef.current)
			setSearch(true)
		else setSearch(false)
	}

	return (
		<input
			className={styles.searchBar}
			type='text'
			placeholder='Search...'
			ref={searchRef}
			onFocus={() => {
				updateSearch()
			}}
			onBlur={() => {
				updateSearch()
			}}
			value={searchText}
			onChange={(e) => {
				setSearchText(e.target.value)
				updateSearch()
			}}
		/>
	)
}
export default SearchBar
