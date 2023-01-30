import PlayController from "../PlayController/PlayController";
import styles from "./PlayBar.module.css";
const PlayBar = () => {
  return (
    <div className={styles.playBar}>
      <PlayController />
    </div>
  );
};
export default PlayBar;
