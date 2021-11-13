import React, { Component } from "react";

import styles from "./styles/YoutubeVideo.module.css";

class YoutubeVideo extends Component<{ id: string; width?: string }, {}> {
  render() {
    return (
      <div className={styles.component}>
        <iframe
          src={`https://www.youtube.com/embed/${this.props.id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
    );
  }
}

export default YoutubeVideo;
