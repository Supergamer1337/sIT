import styles from './SongResult.module.css'
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QueueIcon from "@mui/icons-material/Queue";
export interface SongContainerInterface {
  name: string;
  album: string;
  artist: string;
  length: string;
  songUri: string;
}

const SongContainer = ({
  name,
  album,
  artist,
  length,
  songUri,
}: SongContainerInterface) => {
  return (
    <div className={styles.container}>
      <div>
        <h3>{name}</h3>
        <p>
          {artist} - {album}
        </p>
      </div>
      <div>
        <PlayArrowIcon
          className={`icon ${styles.resultIcon}`}
          onClick={() => {}}
        />
        <QueueIcon className={`icon ${styles.resultIcon}`} onClick={() => {}} />
      </div>
    </div>
  );
};
export default SongContainer
