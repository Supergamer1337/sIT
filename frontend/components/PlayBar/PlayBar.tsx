import PlayController from "../PlayController/PlayController";
import QueueList from "../QueueList/QueueList";
import styles from "./PlayBar.module.css";
const PlayBar = () => {
  return (
    <div className={styles.playBar}>
      <PlayController /> Now playing: music
    </div>
  );
};
export default PlayBar;
