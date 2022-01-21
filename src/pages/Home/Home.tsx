import axios from "axios";
import React, { Component } from "react";
import { pageview } from "react-ga";
import bandImage from "../../assets/band3.png";
import bandBanner from "../../assets/band3_flat2.png";

import DropdownList from "../../components/home/DropdownList";
import NarrowContents from "../../components/home/NarrowContents";
import Banner from "../../components/other/Banner";
import {
  BACKGROUND_GREY,
  BACKGROUND_GREY_GRADIENT,
  MUSIC_HIGHLIGHTS_URL,
  SHOWS_URL,
  VIDEO_HIGHLIGHTS_URL,
} from "../../config";
import { Show } from "../../types/show";
import { Playlist as SpotifyPlaylist, Track } from "../../types/spotify";
import { Playlist as YoutubePlaylist, Video } from "../../types/youtube";
import Body from "../Body";
import { Custom } from "../../components/other/Responsive";
import Socials from "../../components/Socials";

const Mobile = Custom({ maxWidth: 1185 });
const Desktop = Custom({ minWidth: 1185 });

class Home extends Component {
  // when component mounts, load in media ids from database (no loading in the sub-components)

  state: {
    tracks: Track[];
    videos: Video[];
    shows: Show[];
    hover: string;
  };

  constructor(props: any) {
    super(props);

    this.state = {
      tracks: [],
      videos: [],
      hover: "",
      shows: [],
    };
  }

  fetchData = async () => {
    try {
      const res = await axios.get<{ playlist: SpotifyPlaylist }>(
        MUSIC_HIGHLIGHTS_URL
      );
      this.setState({ tracks: res.data.playlist.tracks });
    } catch (_) {}
    try {
      const res = await axios.get<{ playlist: YoutubePlaylist }>(
        VIDEO_HIGHLIGHTS_URL
      );
      this.setState({ videos: res.data.playlist.videos });
    } catch (_) {}
    try {
      const res = await axios.get<{ upcomingShows: Show[]; pastShows: Show[] }>(
        SHOWS_URL
      );
      this.setState({ shows: res.data.upcomingShows });
    } catch (_) {}
  };

  componentDidMount = async () => {
    pageview(window.location.pathname);

    await this.fetchData();
  };

  onEnter = (hover: string) => {
    return () => {
      this.setState({ hover });
    };
  };

  onLeave = () => {
    this.setState({ hover: "" });
  };

  componentDidUpdate() {}
  pageStyle: React.CSSProperties = {
    position: "relative",
    height: "calc(100vh - var(--menu-height))",
    width: "100vw",
    maxWidth: "100vw",
    overflowY: "auto",
    zIndex: 0,
  };

  backgroundImage: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: `0px`,
    height: "100%",
    width: "100%",
    backgroundImage: "url(" + bandImage + ")",
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    filter: "grayscale(40%)",
    zIndex: -2,
  };

  backgroundColor: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: `0px`,
    height: "100%",
    width: "100%",
    background: "var(--primary-color)",
    opacity: 0.26,
  };

  bannerWrapper: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "280px",
  };

  narrowStyle: React.CSSProperties = {
    background: "rgb(0, 0, 0, 0.18)",
  };

  render() {
    return (
      <Body page="Home">
        <div style={this.pageStyle}>
          <Desktop>
            <>
              <div style={this.backgroundImage}></div>
              <div style={this.backgroundColor}></div>
              <DropdownList
                style={{
                  position: "absolute",
                  top: "150px",
                  left: "0px",
                  width: "100%",
                  zIndex: "1",
                }}
                tracks={this.state.tracks}
                videos={this.state.videos}
                shows={this.state.shows}
              />
            </>
          </Desktop>
          <Mobile>
            <>
              <div style={this.bannerWrapper}>
                <Banner
                  img={bandBanner}
                  height="280px"
                  width={"1920px"}
                  left="-120px"
                />
                <div style={this.backgroundColor}></div>
              </div>
              <NarrowContents
                tracks={this.state.tracks}
                videos={this.state.videos}
                shows={this.state.shows}
                style={this.narrowStyle}
              />
            </>
          </Mobile>
        </div>
      </Body>
    );
  }
}

export default Home;
