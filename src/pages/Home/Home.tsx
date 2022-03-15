import axios from "axios";
import React, { useEffect, useState } from "react";
import { pageview } from "react-ga";
import { useMediaQuery } from "react-responsive";
import loadingImg from "../../assets/loading.png";
import wallImg from "../../assets/tyler_wall.jpg";
import DropdownList from "../../components/home/DropdownList";
import NarrowContents from "../../components/home/NarrowContents";
import { Custom } from "../../components/other/Responsive";
import {
  MUSIC_HIGHLIGHTS_URL,
  SHOWS_URL,
  VIDEO_HIGHLIGHTS_URL,
} from "../../config";
import { Show } from "../../types/show";
import { Playlist as SpotifyPlaylist, Track } from "../../types/spotify";
import { Playlist as YoutubePlaylist, Video } from "../../types/youtube";

const customMobile = 1185;
const AllMobile = Custom({ maxWidth: customMobile });
const Desktop = Custom({ minWidth: customMobile });

function Home() {
  // when component mounts, load in media ids from database (no loading in the sub-components)
  const [tracks, setTracks] = useState<Track[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [loaded, setLoaded] = useState(false); // image loaded

  async function fetchData() {
    try {
      const res = await axios.get<{ playlist: SpotifyPlaylist }>(
        MUSIC_HIGHLIGHTS_URL
      );
      setTracks(res.data.playlist.tracks);
    } catch (err: any) {
      console.error(err);
    }
    try {
      const res = await axios.get<{ playlist: YoutubePlaylist }>(
        VIDEO_HIGHLIGHTS_URL
      );
      setVideos(res.data.playlist.videos);
    } catch (err: any) {
      console.error(err);
    }
    try {
      const res = await axios.get<{ upcomingShows: Show[]; pastShows: Show[] }>(
        SHOWS_URL
      );
      setShows(res.data.upcomingShows);
    } catch (err: any) {
      console.error(err);
    }
  }

  useEffect(() => {
    pageview(window.location.pathname);
    window.scrollTo(0, 0);

    fetchData();
  }, []);

  // styles
  const globalStyle: React.CSSProperties = {
    position: "relative",
    width: "100vw",
    height: useMediaQuery({ minWidth: customMobile })
      ? "calc(100vh - var(--menu-height))"
      : "auto",
  };

  const pageStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "auto",
    zIndex: 0,
  };

  const desktopStyle: React.CSSProperties = {
    display: loaded ? "" : "none",
  };

  const loadingThing: React.CSSProperties = {
    display: loaded ? "none" : "flex",
    background: "var(--primary-color)",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--white-color)",
    fontFamily: "var(--header-font)",
    fontSize: "2rem",
    opacity: 0.7,
  };

  const loadingImgStyle: React.CSSProperties = {
    margin: "10px",
    width: "100%",
    maxWidth: "80px",
    animation: "spin 14s linear infinite",
  };

  const desktopImageWrapper: React.CSSProperties = {
    position: "relative",
    height: "calc(100vh - var(--menu-height))",
    overflowY: "hidden",
  };

  const backgroundImage: React.CSSProperties = {
    display: loaded ? "" : "",
    position: "absolute",
    top: "0px",
    left: `0px`,
    height: "140%",
    width: "100%",
    filter: "grayscale(40%)",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
  };

  const mobileQuery = useMediaQuery({ maxWidth: 866 });

  const mobileImage: React.CSSProperties = {
    ...backgroundImage,
    height: mobileQuery ? "100%" : "160%",
    left: "-80px",
    width: "125%",
    top: "0%",
  };

  const backgroundColor: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: `0px`,
    height: "100%",
    width: "100%",
    background: "var(--primary-color)",
    opacity: 0.26,
    mixBlendMode: "multiply",
  };

  const bannerWrapper: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "433px",
    overflowY: "hidden",
  };

  const narrowStyle: React.CSSProperties = {};

  return (
    <div style={globalStyle}>
      <div style={pageStyle}>
        <Desktop>
          <>
            <div style={loadingThing}>
              <img src={loadingImg} alt="Loading" style={loadingImgStyle} />
              ...Loading Image...
            </div>
            <div style={desktopStyle}>
              <div style={desktopImageWrapper}>
                <img
                  style={backgroundImage}
                  src={wallImg}
                  alt="Background"
                  onLoad={() => {
                    setLoaded(true);
                  }}
                />
                <div style={backgroundColor}></div>
              </div>

              <DropdownList
                style={{
                  position: "absolute",
                  top: "150px",
                  left: "0px",
                  width: "100%",
                  zIndex: "1",
                }}
                tracks={tracks}
                videos={videos}
                shows={shows}
              />
            </div>
          </>
        </Desktop>

        {/* Mobile is defined wider than other pages due to dropdown issues */}
        <AllMobile>
          <>
            <div style={bannerWrapper}>
              <div style={{ display: loaded ? "none" : "", height: "100%" }}>
                <div style={loadingThing}>
                  <img src={loadingImg} alt="" style={loadingImgStyle} />
                  ...Loading Image...
                </div>
              </div>
              <div style={{ display: loaded ? "" : "none" }}>
                <img
                  style={mobileImage}
                  src={wallImg}
                  alt="Background"
                  onLoad={() => {
                    setLoaded(true);
                  }}
                />
              </div>

              <div style={backgroundColor}></div>
            </div>

            <NarrowContents
              tracks={tracks}
              videos={videos}
              shows={shows}
              style={narrowStyle}
            />
          </>
        </AllMobile>
      </div>
    </div>
  );
}

export default Home;
