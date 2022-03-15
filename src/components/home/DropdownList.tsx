import React, { Component } from "react";
import { POP_OUT_COLOR_SCHEME } from "../../config";
import { Show } from "../../types/show";
import { Track } from "../../types/spotify";
import { Video } from "../../types/youtube";
import Dropdown from "./Dropdown";
import MusicCard from "./MusicCard";
import ShowsCard from "./ShowsCard";
import VideoCard from "./VideoCard";

interface DropdownListProps {
  videos: Video[];
  tracks: Track[];
  shows: Show[];
  style?: React.CSSProperties;
}

class DropdownList extends Component<DropdownListProps, {}> {
  componentStyle: React.CSSProperties;

  constructor(props: DropdownListProps) {
    super(props);

    this.componentStyle = {
      ...props.style,
    };
  }

  linkRow: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "calc(100vh - 150px - var(--menu-height)",
  };

  dropdownStyle: React.CSSProperties = {
    width: "100%",
  };

  musicCard: React.CSSProperties = {
    width: "450px",
    borderRadius: "10px",
    background: POP_OUT_COLOR_SCHEME ? "#121111" : undefined,
  };

  showsCard: React.CSSProperties = {
    width: "350px",
    borderRadius: "10px",
    background: POP_OUT_COLOR_SCHEME ? "#121111" : undefined,
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <div style={this.linkRow}>
          <Dropdown label={"New Videos"} style={this.dropdownStyle}>
            <VideoCard videos={this.props.videos} />
          </Dropdown>
          <Dropdown label={"New Music"} style={this.dropdownStyle}>
            <MusicCard tracks={this.props.tracks} style={this.musicCard} />
          </Dropdown>
          <Dropdown label={"Upcoming Shows"} style={this.dropdownStyle}>
            <ShowsCard shows={this.props.shows} style={this.showsCard} />
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default DropdownList;
