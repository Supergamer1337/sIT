import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./QueueList.module.css";

const QueueList = () => {
  const [view, setView] = useState(true);
  return <div className={styles.queueWrapper}>This is the queue</div>;
};
export default QueueList;
