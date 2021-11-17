import React, { Component } from "react";

import styles from "./styles/SpotifyPreview.module.css";

class SpotifyPreview extends Component<{ previewUrl: string }> {
  render() {
    return (
      <div className={styles.component}>
        <audio controls={true}>
          <source src={this.props.previewUrl} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

export default SpotifyPreview;
