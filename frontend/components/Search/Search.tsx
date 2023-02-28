import { useCallback, useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SongResult from "../SongResult/SongResult";
import styles from "./Search.module.css";

export interface SearchInterface {
  setSearch: (search: boolean) => void;
}

const searchHook = (searchValue: string) => {
  const [data, setData] = useState<null | any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setError(null);

    if (searchValue === "") return setLoading(false);

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/search/song`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: searchValue, amount: 10 }),
        });
        const json = await response.json();
        setData(json);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchValue]);

  return { data, error, loading };
};

const Search = ({ setSearch }: SearchInterface) => {
  const [searchText, setSearchText] = useState("");
  const { data, error, loading } = searchHook(searchText);

  useEffect(() => {
    console.log("-------");
    console.log(data);
    console.log(error);
    console.log(loading);
  }, [data, error, loading]);

  return (
    <div className={styles.search}>
      <SearchBar
        setSearch={setSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className={styles.searchResultContainer}>
        {data
          ? data.map((song: any) => (
              <SongResult
                name={song.name}
                album={song.album}
                artist={song.artists[0].artist}
                length={"3"}
                songUri={song.uri}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Search
