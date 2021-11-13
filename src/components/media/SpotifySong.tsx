import React, { Component } from "react";
import axios from "axios";
import { Mobile, Desktop } from "../other/Responsive";
import {
  Track,
  SpotifyTrack,
  spotifyToTrack,
  SpotifyToken,
} from "../../types/spotify";
import SpotifyLink from "./SpotifyLink";
import SpotifyPreview from "./SpotifyPreview";
import styles from "../../styles/media/SpotifySong.module.css";

class SpotifySong extends Component<
  {
    spotifyToken: SpotifyToken;
    order: number;
    id: string;
  },
  {}
> {
  state = {
    track: {} as Track,
  };

  componentDidMount = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    const now = new Date(Date.now());
    if (this.props.spotifyToken.expires < now) {
      console.log("Error in spotify song. Expired token");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${this.props.spotifyToken.accessToken}`,
      },
    };

    try {
      const res = await axios.get<SpotifyTrack>(
        `https://api.spotify.com/v1/tracks/${this.props.id}`,
        config
      );
      const track = spotifyToTrack(res.data);
      this.setState({ track });
    } catch (err) {
      console.log("Error while fetching tracks from spotify");
    }
  };

  albumDesktop = () => {
    return (
      <div className={styles.albumDesktop}>
        <img
          src={this.state.track.images.medium.url}
          alt={this.state.track.name}
          className={styles.albumCoverDesktop}
        />
      </div>
    );
  };

  albumMobile = () => {
    return (
      <div className={styles.albumWrapper}>
        <img
          src={this.state.track.images.medium.url}
          alt={this.state.track.name}
          className={styles.albumCoverMobile}
        />
        <input type="checkbox" className={styles.toggle} />
        <div className={styles.preview}>
          <SpotifyPreview previewUrl={this.state.track.previewUrl} />
        </div>
      </div>
    );
  };

  infoDesktop = () => {
    return (
      <div className={styles.infoDesktop}>
        <h3 className={styles.name}>{this.state.track.name.toUpperCase()}</h3>
        <p className={styles.dateDesktop}>{this.state.track.releaseDate}</p>
      </div>
    );
  };

  infoMobile = () => {
    return (
      <div className={styles.infoMobile}>
        <h3 className={styles.name}>{this.state.track.name.toUpperCase()}</h3>
        <p className={styles.dateMobile}>{this.state.track.releaseDate}</p>
      </div>
    );
  };

  // For desktop
  spotifyLink = () => {
    return (
      <div className={styles.spotifyLink}>
        <p className={styles.linkHeader}>Full {this.state.track.type} on</p>
        <SpotifyLink url={this.state.track.externalUrl} />
      </div>
    );
  };

  desktopDescription = () => {
    return (
      <div className={styles.desktopDescription}>
        {this.albumDesktop()}
        <div className={styles.innerDescription}>
          {this.infoDesktop()}
          {this.spotifyLink()}
        </div>
      </div>
    );
  };

  render() {
    if (this.state.track.name) {
      return (
        <>
          <Mobile>
            <div className={styles.mobileComponent}>
              {this.albumMobile()}
              {this.infoMobile()}
            </div>
          </Mobile>
          <Desktop>
            <div className={styles.desktopComponentColumn}>
              {this.desktopDescription()}
              {<SpotifyPreview previewUrl={this.state.track.previewUrl} />}
            </div>
          </Desktop>
        </>
      );
    } else {
      return null;
    }
  }
}

export default SpotifySong;
