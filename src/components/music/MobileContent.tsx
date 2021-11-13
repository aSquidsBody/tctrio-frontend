import React, { Component } from "react";
import { SpotifyToken, Album } from "../../types/spotify";

class MobileContent extends Component<
  {
    spotifyToken: SpotifyToken;
    albums: Album[];
  },
  {}
> {
  render() {
    return <div>Music Mobile</div>;
  }
}

export default MobileContent;
