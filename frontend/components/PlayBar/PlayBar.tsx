import { useWebsocketListenAndEmit } from '@/hooks/useWebsocketListenAndFetch'
import { useState } from 'react'
import PlayController from '../PlayController/PlayController'
import styles from './PlayBar.module.css'

const PlayBar = () => {
	const [nowPlaying, setNowPlaying] = useState({
    name: "",
    artists: [""],
    album: "",
  });

  useWebsocketListenAndEmit(
    "update-playback-state",
    (data) => {
      setNowPlaying({
        name: data.name,
        artists: data.artist,
        album: data.album,
      });
    },
    "get-playback-state",
    []
  );

  return (
    <div className={styles.playBar}>
      <PlayController />{" "}
      <>
        Now playing: {nowPlaying.name}
        <br />
        by: {nowPlaying.artists.join(", ")} ({nowPlaying.album})
      </>
    </div>
  );
}
export default PlayBar
