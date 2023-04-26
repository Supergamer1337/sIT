import { useWebsocketListenAndEmit } from '@/hooks/useWebsocketListenAndFetch'
import { useState } from 'react'
import PlayController from '../PlayController/PlayController'
import styles from './PlayBar.module.css'

const PlayBar = () => {
	const [nowPlaying, setNowPlaying] = useState<string>('')

	useWebsocketListenAndEmit(
    "update-playback-state",
    (data: any) => {
      setNowPlaying(data.name);
    },
    "get-playback-state",
    []
  );

	return (
		<div className={styles.playBar}>
			<PlayController /> Now playing: {nowPlaying}
		</div>
	)
}
export default PlayBar
