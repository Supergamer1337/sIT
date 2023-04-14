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
  const [playbackState, setPlaybackState] = useState({
    name: "",
    artists: "",
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
  setInterval(() => {
    if (nowPlaying.artists) {
      setPlaybackState({
        name: nowPlaying.name,
        artists: nowPlaying.artists.join(", "),
        album: nowPlaying.album,
      });
    }
  }, 100);
  return (
    <div className={styles.playBar}>
      <PlayController />{" "}
      <>
        Now playing: {playbackState.name}
        <br />
        by: {playbackState.artists} ({playbackState.album})
      </>
    </div>
  );
}
export default PlayBar
