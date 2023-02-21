import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./QueueList.module.css";
import QueueCard, { QueueCardProps } from "../QueueCard/QueueCard";

const QueueList = () => {
  const [view, setView] = useState(true);
  var queuedItems: QueueCardProps[] = [
    { songName: "Hello", artist: "World", album: "Album", songUri: "hej" },
  ];
  return (
    <div className={styles.queueWrapper}>
      {queuedItems.map((q) => (
        <QueueCard
          key={q.songName}
          songName={q.songName}
          artist={q.artist}
          album={q.album}
          songUri={q.songUri}
        />
      ))}
    </div>
  );
};
export default QueueList;
