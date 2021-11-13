import { Component } from "react";
import axios from "axios";
import Body from "../Body";
import SpotifySong from "../../components/media/SpotifySong";
import YoutubeVideo from "../../components/media/YoutubeVideo";
import Banner from "../../components/other/Banner";

import marshallImage from "../../assets/home_image_desktop_3.jpg";
import { Media, SpotifyToken } from "../../types/spotify";
import styles from "./styles/Home.module.css";

class Home extends Component<
  {
    spotifyToken: SpotifyToken;
  },
  {}
> {
  // when component mounts, load in media ids from database (no loading in the sub-components)
  state = { songIds: [], videoIds: [] };

  fetchData = async () => {
    let returns = "";

    try {
      const res = await axios.get<Media>(
        "http://localhost:3000/api/music/highlights"
      );
      this.setState({ songIds: res.data.ids });
    } catch (err) {
      console.log("Error fetching music highlight ids");
    }

    try {
      const res = await axios.get<Media>(
        "http://localhost:3000/api/videos/youtube-highlights"
      );
      this.setState({ videoIds: res.data.ids });
    } catch (err) {
      console.log("Error fetching youtube highlight ids");
    }
    return returns;
  };

  componentDidMount = async () => {
    await this.fetchData();
  };

  render() {
    return (
      <Body>
        <div className={styles.component}>
          <div className={styles.banner}>
            <Banner
              img={marshallImage}
              width="2500px"
              top="-700px"
              left="-300px"
            />
          </div>
          <div className="container">
            <div className={styles.content}>
              {this.state.songIds.length ? (
                <section className={styles.music}>
                  <div className={styles.previews}>
                    {this.state.songIds.map((songId, index) => {
                      return (
                        <SpotifySong
                          key={songId}
                          order={index % 2}
                          id={songId}
                          spotifyToken={this.props.spotifyToken}
                        />
                      );
                    })}
                  </div>
                </section>
              ) : null}
              {this.state.videoIds.length ? (
                <section className={styles.videos}>
                  <div className={styles.labelBox}>
                    <h2 className="header-font margin-top-5 margin-bottom-5">
                      YOUTUBE HIGHLIGHT
                    </h2>
                  </div>
                  <div className={styles.videoList}>
                    {this.state.videoIds.map((videoId, index) => {
                      return (
                        <div className={styles.video}>
                          <YoutubeVideo id={videoId} key={index} />
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </Body>
    );
  }
}

export default Home;
