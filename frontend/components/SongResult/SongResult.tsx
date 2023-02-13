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

const playSong = async (song: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/play/song`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songURI: song }),
    });
    const json = await response.json();
    if (json.status === 200) {
      console.log("Song played");
    } else {
      throw Error("Song could not be played");
    }
  } catch (error: any) {
    console.log(error);
  }
};

const addQueue = async (song: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/play/song`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songURI: song }),
    });
    const json = await response.json();
    if (json.status === 200) {
      console.log("Song played");
    } else {
      throw Error("Song could not be played");
    }
  } catch (error: any) {
    console.log(error);
  }
};

const SongContainer = ({
  name,
  album,
  artist,
  length,
  songUri,
}: SongContainerInterface) => {
  return (
    <div className={styles.container}>
      <div className={styles.resultInfoContainer}>
        <h3>{name}</h3>
        <p>
          {artist} - {album}
        </p>
      </div>
      <div className={styles.resultIconContainer}>
        <PlayArrowIcon
          className={`icon ${styles.resultIcon}`}
          onClick={() => {
            playSong(songUri);
          }}
        />
        <QueueIcon className={`icon ${styles.resultIcon}`} onClick={() => {}} />
      </div>
    </div>
  );
};
export default SongContainer
