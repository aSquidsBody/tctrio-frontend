import React, { Component } from "react";
import YoutubeVideo from "../media/YoutubeVideo";
import { BACKGROUND_GREY_GRADIENT } from "../../config";
import { Video } from "../../types/youtube";

interface CardProps {
  videos: Video[];
  style?: React.CSSProperties;
}

class VideoCard extends Component<CardProps, {}> {
  componentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: "0",
    width: "100%",
    background: BACKGROUND_GREY_GRADIENT,
    borderRadius: "5px",
    boxShadow: "0px 2px 10px 0px black",
  };
  constructor(props: CardProps) {
    super(props);

    if (this.props.style) {
      this.componentStyle = {
        ...this.props.style,
        position: "relative",
        zIndex: "0",
        width: "100%",
        background: BACKGROUND_GREY_GRADIENT,
        borderRadius: "5px",
        boxShadow: "0px 2px 10px 0px black",
      };
      this.componentStyle.height = this.componentStyle.height || "100%";
      this.componentStyle.width = this.componentStyle.width || "100%";
    }
  }

  padding: React.CSSProperties = {
    padding: "7px",
  };

  videoDiv: React.CSSProperties = {
    width: "370px",
    padding: "3px",
  };

  lineDiv: React.CSSProperties = {
    background: "#555",
    width: "90%",
    height: "2px",
    margin: "10px auto",
  };

  render() {
    if (!this.props.videos) return null;
    return (
      <div style={this.componentStyle}>
        <div style={this.padding}>
          <div style={this.lineDiv}></div>
          {this.props.videos.map(({ id }) => {
            return (
              <div style={this.videoDiv} key={"video" + id}>
                <YoutubeVideo id={id}></YoutubeVideo>
              </div>
            );
          })}
          <div style={this.lineDiv}></div>
        </div>
      </div>
    );
  }
}

export default VideoCard;
