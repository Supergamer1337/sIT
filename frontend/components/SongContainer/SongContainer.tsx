import styles from "./SongContainer.module.css";
export interface SongContainerInterface {
  name: string;
  album: string;
  artist: string;
}
const SongContainer = ({ name, album, artist }: SongContainerInterface) => {
  return (
    <div className={styles.container}>
      <h3>{name}</h3>
      <p>
        {artist} - {album}
      </p>
    </div>
  );
};
export default SongContainer;
