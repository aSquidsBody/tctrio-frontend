import React, { Component } from "react";
import SpotifyLink from "./SpotifyLink";
import { Custom } from "../other/Responsive";

import { Album, SpotifyToken } from "../../types/spotify";
import styles from "./styles/AlbumGrid.module.css";

const QueryGTE1100 = Custom({ minWidth: 1100 });
const QueryLTE1100 = Custom({ maxWidth: 1100 });
const QueryGTE780 = Custom({ minWidth: 780 });
const QueryLTE780 = Custom({ maxWidth: 780 });

class AlbumGrid extends Component<
  {
    albums: Album[];
    spotifyToken: SpotifyToken;
  },
  {}
> {
  // Returns a list of class-less uls
  grid = (albums: Album[], rowSize: number) => {
    const n = Math.floor(albums.length / rowSize) + 1;
    return (
      <div>
        {Array.from(Array(n).keys()).map((i) => {
          const albs = albums.slice(rowSize * i, rowSize * (i + 1));
          return (
            <div className={styles.row}>
              <ul key={albs.map((a) => a.name).join("")}>
                {this.albumRow(albs)}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  albumRow = (albums: Album[]) => {
    return albums.map((album) => {
      return (
        <li key={"album+" + album.name} className={styles.album}>
          {this.album(album)}
        </li>
      );
    });
  };

  album = (album: Album) => {
    // List the name and date;
    const year = album.releaseDate.split("-")[0];
    return (
      <>
        <div className={styles.albumInfo}>
          <h5>{album.name}</h5>
          <p>
            {album.albumType} / {year}
          </p>
          <div className={styles.link}>
            <SpotifyLink url={album.externalUrl} />
          </div>
        </div>
        <QueryGTE780>
          <img
            className={styles.cover}
            src={album.images.large.url}
            alt={`${album.name} cover`}
          />
        </QueryGTE780>
        <QueryLTE780>
          <img
            className={styles.cover}
            src={album.images.medium.url}
            alt={`${album.name} cover`}
          />
        </QueryLTE780>
      </>
    );
  };

  render() {
    if (this.props.albums.length === 0) return null;

    // Sort the albums by release date
    const albums = this.props.albums.sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return dateA > dateB ? 0 : 1;
    });

    return (
      <div className={styles.component}>
        <QueryGTE1100>{this.grid(albums, 3)}</QueryGTE1100>
        <QueryLTE1100>{this.grid(albums, 2)}</QueryLTE1100>
      </div>
    );
  }
}

export default AlbumGrid;
