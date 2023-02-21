import styles from "./QueueCard.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { startSong } from "@/lib/MusicController";
export interface QueueCardProps {
  songName: string;
  artist: string;
  album: string;
  songUri: string;
}
const QueueCard = ({ songName, artist, album, songUri }: QueueCardProps) => {
  return (
    <div className={styles.container}>
      <div>
        <h3>{songName}</h3>
        <p className={styles.info}>
          {artist} - {album}
        </p>
      </div>
      <div className={styles.resultIconContainer}>
        <PlayArrowIcon
          className={`icon ${styles.resultIcon}`}
          onClick={() => {
            startSong(songUri);
          }}
        />
      </div>
    </div>
  );
};
export default QueueCard;
