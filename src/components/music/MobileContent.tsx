import React, { Component } from "react";
import { Album } from "../../types/spotify";

class MobileContent extends Component<
  {
    albums: Album[];
  },
  {}
> {
  render() {
    return <div>Music Mobile</div>;
  }
}

export default MobileContent;
