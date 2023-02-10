import styles from "./SearchBar.module.css";
export interface SearchBarInterface {
  setSearch: any;
}

const SearchBar = ({ setSearch }: SearchBarInterface) => {
  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="Search..."
      onClick={() => {
        setSearch(true);
      }}
    />
  );
};
export default SearchBar;
