import { Component } from "react";
import { Video } from "../../types/youtube";
import YoutubeVideo from "./YoutubeVideo";

import styles from "./styles/YoutubeGrid.module.css";

class YoutubeGrid extends Component<{ videos: Video[] }, {}> {
  render() {
    return (
      <div className={styles.component}>
        <div className={styles.grid}>
          {this.props.videos.map(({ id }) => {
            return (
              <div className={styles.frame} key={`video-${id}`}>
                <YoutubeVideo id={id} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default YoutubeGrid;
