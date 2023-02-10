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
	return (
		<input
			className={styles.searchBar}
			type='text'
			placeholder='Search...'
			onFocus={() => {
				setSearch(true)
			}}
			value={searchText}
			onChange={(e) => setSearchText(e.target.value)}
		/>
	)
}
export default SearchBar
