import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { useState } from "react";
import styles from "./PlayController.module.css";

const PlayController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <FastRewindIcon className={styles.playIcon} />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={styles.playButton}
      >
        {isPlaying ? (
          <PauseIcon className={styles.playIcon} />
        ) : (
          <PlayArrowIcon className={styles.playIcon} />
        )}
      </button>
      <FastForwardIcon className={styles.playIcon} />
    </>
  );
};
export default PlayController;
