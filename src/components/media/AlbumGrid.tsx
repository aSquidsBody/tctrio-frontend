import React from "react";
import { Album } from "../../types/spotify";
import { Custom } from "../other/Responsive";
import SpotifyAlbum from "./SpotifyAlbum";
import styles from "./styles/AlbumGrid.module.css";

const QueryGTE1150 = Custom({ minWidth: 1150 });
const QueryLTE1150 = Custom({ maxWidth: 1150 });

interface AlbumGridProps {
  albums: Album[];
}

function AlbumGrid(props: AlbumGridProps) {
  // Returns a list of class-less uls
  function grid(albums: Album[], rowSize: number) {
    const n = Math.floor(albums.length / rowSize) + 1;
    return (
      <div>
        {Array.from(Array(n).keys()).map((i) => {
          const albs = albums.slice(rowSize * i, rowSize * (i + 1));
          return (
            <div className={styles.row} key={albs.map((a) => a.name).join("")}>
              <ul>
                <AlbumRow albums={albs} />
              </ul>
            </div>
          );
        })}
      </div>
    );
  }

  function AlbumRow({ albums }: { albums: Album[] }) {
    return (
      <>
        {albums.map((album) => {
          return (
            <div key={"album+" + album.name}>
              <SpotifyAlbum album={album} />
            </div>
          );
        })}
      </>
    );
  }

  if (props.albums.length === 0) return null;

  const albums = props.albums.sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateA > dateB ? 0 : 1;
  });

  return (
    <div id="discography" className={styles.component}>
      <QueryGTE1150>{grid(albums, 3)}</QueryGTE1150>
      <QueryLTE1150>{grid(albums, 2)}</QueryLTE1150>
    </div>
  );
}

export default AlbumGrid;
