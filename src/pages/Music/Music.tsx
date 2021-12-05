import React, { Component } from "react";
import Body from "../Body";
import { Desktop } from "../../components/other/Responsive";
import Banner from "../../components/other/Banner";
import AlbumGrid from "../../components/media/AlbumGrid";
import YoutubeGrid from "../../components/media/YoutubeGrid";

import { SpotifyToken, Album } from "../../types/spotify";
import { Video } from "../../types/youtube";
import devicesBanner from "../../assets/devices_cropped.png";
import CustomHeader from "../../components/CustomHeader";

import axios from "axios";
import { ALBUM_URL, YOUTUBE_URL } from "../../config";
import styles from "./styles/Music.module.css";

class Music extends Component<
  {
    spotifyToken: SpotifyToken;
  },
  {}
> {
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
      const res = await axios.get<Video[]>(YOUTUBE_URL);
      this.setState({ videos: res.data });
      console.log(res.data);
    } catch (err: any) {
      console.log("Error getting youtube ids", err);
    }
  };

  componentDidMount = async () => {
    await this.fetchAlbums();
    await this.fetchVideos();
  };

  render() {
    return (
      <Body>
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
                  <AlbumGrid
                    spotifyToken={this.props.spotifyToken}
                    albums={this.state.albums}
                  />
                </div>
              ) : null}
            </section>
            <section className={styles.videos}>
              <CustomHeader
                value={"Youtube Videos"}
                color={"var(--white-color)"}
              />
              {this.state.videos.length !== 0 ? (
                <div>
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
