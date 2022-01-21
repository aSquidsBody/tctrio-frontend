import React, { Component } from "react";
import Body from "../Body";
import { Desktop } from "../../components/other/Responsive";
import Banner from "../../components/other/Banner";
import AlbumGrid from "../../components/media/AlbumGrid";
import YoutubeGrid from "../../components/media/YoutubeGrid";

import { Album } from "../../types/spotify";
import { Playlist, Video } from "../../types/youtube";
import devicesBanner from "../../assets/devices_cropped.png";
import CustomHeader from "../../components/CustomHeader";

import axios from "axios";
import { ALBUM_URL, YOUTUBE_URL } from "../../config";
import styles from "./styles/Music.module.css";
import { pageview } from "react-ga";

class Music extends Component {
  state = {
    square: true,
    albums: [] as Album[],
    videos: [] as Video[],
  };

  fetchAlbums = async () => {
    const url = ALBUM_URL;
    try {
      const res = await axios.get<{ albums: Album[] }>(url);
      this.setState({ albums: res.data.albums });
    } catch (err: any) {
      console.log("Error getting albums", err.response?.data);
    }
  };

  fetchVideos = async () => {
    try {
      console.log(YOUTUBE_URL);
      const res = await axios.get<{ playlist: Playlist }>(YOUTUBE_URL);
      const videos: Video[] = res.data.playlist.videos;
      this.setState({ videos });
    } catch (err: any) {
      console.log("Error getting youtube ids", err);
    }
  };

  componentDidMount = async () => {
    pageview(window.location.pathname);
    await this.fetchAlbums();
    await this.fetchVideos();
  };

  render() {
    return (
      <Body page="Music">
        <div className={styles.component}>
          <Desktop>
            <div className={styles.banner}>
              <Banner img={devicesBanner} width="2000px" top="-50px" />
            </div>
          </Desktop>
          <div className="container">
            <section className={styles.albums}>
              <CustomHeader value={"Discography"} />
              {this.state.albums.length ? (
                <div>
                  <AlbumGrid albums={this.state.albums} />
                </div>
              ) : null}
            </section>
            <section className={styles.videos}>
              <CustomHeader
                value={"Youtube Videos"}
                color={"var(--white-color)"}
              />
              {this.state.videos.length !== 0 ? (
                <div
                  style={{
                    paddingBottom: "15px",
                  }}
                >
                  <YoutubeGrid videos={this.state.videos} />
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </Body>
    );
  }
}

export default Music;
