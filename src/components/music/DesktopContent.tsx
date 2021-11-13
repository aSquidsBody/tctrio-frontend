import { Component } from "react";
import Banner from "../other/Banner";
import AlbumGrid from "../media/AlbumGrid";
import YoutubeGrid from "../media/YoutubeGrid";

import { SpotifyToken, Album } from "../../types/spotify";
import { Video } from "../../types/youtube";
import devicesBanner from "../../assets/devices.png";
import CustomHeader from "../CustomHeader";
import styles from "./DesktopContent.module.css";

class DesktopContent extends Component<
  {
    spotifyToken: SpotifyToken;
    albums: Album[];
    videos: Video[];
  },
  {}
> {
  state = {
    square: true,
  };

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.banner}>
          <Banner img={devicesBanner} top={"-100%"} />
        </div>
        <div className="container">
          <section className={styles.albums}>
            <CustomHeader value={"Discography"} />
            {this.props.albums.length ? (
              <div>
                <AlbumGrid
                  spotifyToken={this.props.spotifyToken}
                  albums={this.props.albums}
                />
              </div>
            ) : null}
          </section>
          <section className={styles.videos}>
            <CustomHeader
              value={"Youtube Videos"}
              color={"var(--white-color)"}
            />
            {this.props.videos.length !== 0 ? (
              <div>
                <YoutubeGrid videos={this.props.videos} />
              </div>
            ) : null}
          </section>
        </div>
      </div>
    );
  }
}

export default DesktopContent;
