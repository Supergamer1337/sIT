import { pauseMusic, playMusic } from '@/lib/MusicController'
import FastForwardIcon from '@mui/icons-material/FastForward'
import FastRewindIcon from '@mui/icons-material/FastRewind'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useState } from 'react'
import styles from './PlayController.module.css'

const PlayController = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	return (
		<div className={styles.playControllerBox}>
			<FastRewindIcon
				className='icon'
				onClick={() => setIsPlaying(!isPlaying)}
			/>

			{isPlaying ? (
				<PauseIcon
					className='icon'
					onClick={() => {
						setIsPlaying(false)
						pauseMusic()
					}}
				/>
			) : (
				<PlayArrowIcon
					className='icon'
					onClick={() => {
						setIsPlaying(true)
						playMusic()
					}}
				/>
			)}

			<FastForwardIcon
				className='icon'
				onClick={() => setIsPlaying(!isPlaying)}
			/>
		</div>
	)
}
export default PlayController
