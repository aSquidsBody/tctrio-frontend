import React, { Component } from "react";
import { MOBILE_HOME_COLOR } from "../../config";
import { Show } from "../../types/show";
import { Track } from "../../types/spotify";
import { Video } from "../../types/youtube";
import { ShowsList } from "../about/ShowsList";
import CustomHeader from "../CustomHeader";
import Socials from "../Socials";
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
    // background: MOBILE_HOME_COLOR,
    // color: "white",
  };

  musicDividerBox: React.CSSProperties = {
    // background: MOBILE_HOME_COLOR,
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

  musicWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  musicCard: React.CSSProperties = {
    width: "98%",
    // borderRadius: "10px",
    paddingTop: "10px",
    background: "#404040",
  };

  videoWrapper: React.CSSProperties = {
    borderBottom: "solid 8px var(--primary-color)",
  };

  videoDividerBox: React.CSSProperties = {
    ...this.musicDividerBox,
    background: MOBILE_HOME_COLOR,
  };

  narrowVidDiv: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  vidBlue: React.CSSProperties = {
    position: "absolute",
    height: "110px",
    width: "100%",
    top: "30px",
    left: "0px",
    background: "var(--primary-color)",
  };

  socialsWrapper: React.CSSProperties = {
    position: "relative",
    width: "90%",
    height: "1px",
    margin: "0px auto",
  };

  socialsPositioning: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    top: "-45px",
    background: "var(--primary-color)",
    borderRadius: "10px",
    opacity: 0.9,
    boxShadow: "3px 3px 25px 4px black",
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
    paddingTop: "10px",
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <div style={this.socialsWrapper}>
          <div style={this.socialsPositioning}>
            <Socials style={this.socialsStyle} />
          </div>
        </div>
        <div style={this.musicWrapper}>
          <CustomHeader value="New Music" color="black" margin={40} />
          <MusicCard tracks={this.props.tracks} style={this.musicCard} />
        </div>
        <div style={this.videoWrapper}>
          <div style={this.narrowVidDiv}>
            <div style={this.vidBlue} />
            <CustomHeader value="New Music Videos" color="white" margin={40} />
            <NarrowVideos
              videos={this.props.videos}
              style={{
                width: "98%",
              }}
            />
          </div>
        </div>
        <div style={this.showsWrapper}>
          <CustomHeader value="Upcoming Shows" margin={40} />
          <ShowsList
            title={""}
            showsList={this.props.shows}
            alt={false}
            style={{
              width: "98%",
            }}
          ></ShowsList>
        </div>
      </div>
    );
  }
}

export default NarrowContents;
