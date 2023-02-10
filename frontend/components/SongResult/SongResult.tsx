import styles from './SongResult.module.css'
export interface SongContainerInterface {
	name: string
	album: string
	artist: string
	length: string
	songUri: string
}

const SongContainer = ({
	name,
	album,
	artist,
	length,
	songUri
}: SongContainerInterface) => {
	return (
		<div className={styles.container}>
			<h3>{name}</h3>
			<p>
				{artist} - {album}
			</p>
		</div>
	)
}
export default SongContainer
