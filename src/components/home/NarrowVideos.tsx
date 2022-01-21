import React, { Component } from "react";
import { Video } from "../../types/youtube";
import YoutubeVideo from "../media/YoutubeVideo";
import { Custom } from "../other/Responsive";

const Mobile = Custom({ maxWidth: 570 });
const Desktop = Custom({ minWidth: 570 });

interface NarrowVideosProps {
  style?: React.CSSProperties;
  videos: Video[];
}

class NarrowVideos extends Component<NarrowVideosProps, {}> {
  componentStyle: React.CSSProperties;

  constructor(props: NarrowVideosProps) {
    super(props);
    this.componentStyle = {
      ...props.style,
    };
  }

  videoList = () => {
    return this.props.videos.length > 0
      ? this.props.videos.map((video, idx) => {
          return (
            <li style={this.liStyle} key={`video+${video.id}+${idx}`}>
              <YoutubeVideo id={video.id} />
            </li>
          );
        })
      : null;
  };

  desktopUl: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  };

  mobileUl: React.CSSProperties = {};

  liStyle: React.CSSProperties = {
    width: "100%",
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <Desktop>
          <ul style={this.desktopUl}>{this.videoList()}</ul>
        </Desktop>
        <Mobile>
          <ul style={this.mobileUl}>{this.videoList()}</ul>
        </Mobile>
      </div>
    );
  }
}

export default NarrowVideos;
