import React, { Component } from "react";

import spotifyWhite from "../../../assets/Spotify_White.png";
import IconBase from "./IconBase";

const SPOTIFY_LINK =
  "https://open.spotify.com/artist/63GbQYzf0EbxtI9D23IdrU?si=kLVHVQ3ISASnn7MB7mSvcA&dl_branch=1";

interface SpotifyProps {
  style?: React.CSSProperties;
}

class SpotifyIcon extends Component<SpotifyProps, {}> {
  render() {
    return (
      <IconBase
        src={spotifyWhite}
        href={SPOTIFY_LINK}
        style={this.props.style}
      ></IconBase>
    );
  }
}

export default SpotifyIcon;
