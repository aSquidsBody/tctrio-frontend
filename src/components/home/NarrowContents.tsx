import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BACKGROUND_GREY, BACKGROUND_GREY_GRADIENT } from "../../config";
import { Show } from "../../types/show";
import { Track } from "../../types/spotify";
import { Video } from "../../types/youtube";
import Socials from "../Socials";
import Logo from "./Logo";
import MusicCard from "./MusicCard";
import NarrowVideos from "./NarrowVideos";

interface NarrowProps {
  videos: Video[];
  tracks: Track[];
  shows: Show[];
  style?: React.CSSProperties;
}

class NarrowContents extends Component<NarrowProps, {}> {
  componentStyle: React.CSSProperties;
  state: {
    hover: string;
  };

  constructor(props: NarrowProps) {
    super(props);

    this.componentStyle = {
      ...props.style,
    };

    this.state = {
      hover: "",
    };
  }

  musicLabel: React.CSSProperties = {
    textAlign: "center",
    fontFamily: "var(--body-font)",
    fontSize: "2rem",
    lineHeight: "3rem",
    background: BACKGROUND_GREY,
    color: "white",
  };

  musicDividerBox: React.CSSProperties = {
    background: BACKGROUND_GREY,
    height: "8px",
    width: "100%",
    padding: "3px 0px 16px 0px",
  };

  musicDivider: React.CSSProperties = {
    background: `#505050`,
    margin: "auto",
    width: "100%",
    height: "2px",
  };

  showsWrapper: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  showLine: React.CSSProperties = {
    height: "2px",
    margin: "20px auto",
    width: "60%",
    background: BACKGROUND_GREY_GRADIENT,
    opacity: 0.5,
  };

  showsLabel = (): React.CSSProperties => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--primary-color)",
      height: "48px",
      width: "291px",
      opacity: this.state.hover === "shows" ? 0.9 : 1,
      transition:
        this.state.hover === "shows" ? "opacity 0.05s" : "opacity 0.02s",
      boxShadow: "2px 2px 10px 0px black",
    };
  };

  showsLink: React.CSSProperties = {
    color: "white",
    fontFamily: "var(--body-font)",
    fontSize: "2rem",
  };

  musicWrapper: React.CSSProperties = {};

  musicCard: React.CSSProperties = {
    width: "100%",
    background: BACKGROUND_GREY,
  };

  videoWrapper: React.CSSProperties = {};

  videoDividerBox: React.CSSProperties = {
    ...this.musicDividerBox,
    background: BACKGROUND_GREY,
  };

  videoLabel: React.CSSProperties = {
    textAlign: "center",
    fontFamily: "var(--body-font)",
    fontSize: "2rem",
    lineHeight: "3rem",
    background: BACKGROUND_GREY,
    color: "white",
    paddingTop: "27px",
  };

  narrowVidDiv: React.CSSProperties = {
    background: BACKGROUND_GREY,
  };

  socialsWrapper: React.CSSProperties = {
    background: BACKGROUND_GREY_GRADIENT,
    padding: "0px",
  };

  socialsLabel: React.CSSProperties = {
    ...this.videoLabel,
    background: "none",
    lineHeight: "1.7rem",
    padding: "32px 0px 10px 0px",
  };

  socialsDividerBox: React.CSSProperties = {
    ...this.musicDividerBox,
    background: "none",
  };

  socialsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: "10px",
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <div style={this.showsWrapper}>
          <div style={this.showLine} />
          <Logo style={{ marginBottom: "20px", maxWidth: "500px" }}></Logo>
          <div
            style={this.showsLabel()}
            onMouseEnter={() => this.setState({ hover: "shows" })}
            onMouseLeave={() => this.setState({ hover: "" })}
          >
            <Link to={"/About"} style={this.showsLink}>
              View Upcoming Shows
            </Link>
          </div>
          <div style={this.showLine} />
        </div>
        <div style={this.musicWrapper}>
          <div style={this.musicLabel}>New Music</div>
          <div style={this.musicDividerBox}>
            <div style={this.musicDivider}></div>
          </div>
          <MusicCard tracks={this.props.tracks} style={this.musicCard} />
        </div>

        <div style={this.videoWrapper}>
          <div style={this.videoLabel}>New Music Videos</div>
          <div style={this.videoDividerBox}>
            <div style={this.musicDivider} />
          </div>
          <div style={this.narrowVidDiv}>
            <NarrowVideos videos={this.props.videos} />
          </div>
        </div>
        <div style={this.socialsWrapper}>
          <p style={this.socialsLabel}>Follow Me</p>
          <div style={this.socialsDividerBox}>
            <div style={this.musicDivider} />
          </div>
          <Socials style={this.socialsStyle} />
        </div>
      </div>
    );
  }
}

export default NarrowContents;
