import React, { Component, IframeHTMLAttributes } from "react";

interface YoutubeVideoProps {
  id: string;
  width?: string;
  onWheel?: React.WheelEventHandler<HTMLIFrameElement>;
}

class YoutubeVideo extends Component<YoutubeVideoProps, {}> {
  iframeRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: YoutubeVideoProps) {
    super(props);

    this.iframeRef = React.createRef();
  }

  componentStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%",
    zIndex: "0",
  };

  videoStyle: React.CSSProperties = {
    position: "absolute",
    top: "0",
    right: "0",
    width: "100%",
    height: "100%",
    zIndex: "0",
    overflow: "hidden",
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <iframe
          src={`https://www.youtube.com/embed/${this.props.id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={this.videoStyle}
          ref={this.iframeRef}
        ></iframe>
      </div>
    );
  }
}

export default YoutubeVideo;
