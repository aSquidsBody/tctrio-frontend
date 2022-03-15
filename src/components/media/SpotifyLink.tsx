import React, { Component } from "react";

// import spotifyLogo from "../../assets/Spotify_Logo_Green.png";
import spotifyLogo from "../../assets/Spotify_Green.png";
import styles from "./styles/SpotifyLink.module.css";

class SpotifyLink extends Component<{ url: string }, {}> {
  render() {
    return (
      <div className={styles.component}>
        <img src={spotifyLogo} alt="Spotify Logo" className={styles.logo} />
        <a
          href={this.props.url}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          {""}
        </a>
      </div>
    );
  }
}

export default SpotifyLink;
