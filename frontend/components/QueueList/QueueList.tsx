import { useState } from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./QueueList.module.css";

const QueueList = () => {
  const [view, setView] = useState(true);
  return (
    <>
      {view ? (
        <QueueMusicIcon
          onClick={() => {
            setView(!view);
          }}
          className="icon"
        />
      ) : (
        <div className={styles.queueWrapper}>
          This is the queue
          <CloseIcon
            className={`icon ${styles.closeIcon}`}
            onClick={() => {
              setView(!view);
            }}
          />
        </div>
      )}
    </>
  );
};
export default QueueList;
