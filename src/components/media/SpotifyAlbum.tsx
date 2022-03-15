import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Album } from "../../types/spotify";
import { Custom } from "../other/Responsive";
import SpotifyLink from "./SpotifyLink";

const QueryGTE780 = Custom({ minWidth: 780 });
const QueryLTE780 = Custom({ maxWidth: 780 });

interface SpotifyAlbumProps {
  album: Album;
}

function SpotifyAlbum(props: SpotifyAlbumProps) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const desktop = useMediaQuery({ minWidth: 650 });
  const lte780 = useMediaQuery({ maxWidth: 780 });

  const style: React.CSSProperties = {
    position: "relative",
    height: lte780 ? "45vw" : "360px",
    width: lte780 ? "45vw" : "360px",
    paddingBottom: lte780 ? "50%" : "",
  };

  const resizing: React.CSSProperties = {
    position: "absolute",
    height: hover && desktop ? "105%" : "100%",
    width: hover && desktop ? "105%" : "100%",
    top: hover && desktop ? "-2.5%" : "0",
    left: hover && desktop ? "-2.5%" : "0",
    zIndex: hover && desktop ? 1 : 0,
    transition: "all 750ms cubic-bezier(0.2, 1, 0.3, 1)",
  };

  const resizedDiv: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
  };

  const albumInfo: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    zIndex: 2,
  };

  const mobileStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: desktop ? "" : "none",
  };

  const desktopStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: desktop ? "none" : "",
  };

  // styles
  const dropdownOverlay: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: hover ? "100%" : "0px",
    width: "100%",
    opacity: hover ? 0.65 : 0,
    background: "var(--primary-color)",
    transition: "all 750ms cubic-bezier(0.2, 1, 0.3, 1)",
    transitionDelay: hover ? "0.15s" : "0s",
    boxShadow: "0px 2px 10px 0px var(--primary-color)",
    zIndex: 1,
  };

  const fadeIn: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
    opacity: hover ? 1 : 0,
    background: "var(--primary-gradient)",
    transition: "all 750ms cubic-bezier(0.2, 1, 0.3, 1)",
    transitionDelay: hover ? ".35s" : "0s",
    zIndex: 2,
    overflowY: "hidden",
    padding: "30px 25px 20px 25px",
  };

  const faded: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
  };

  const paragraph: React.CSSProperties = {
    fontFamily: "var(--body-font)",
    fontSize: "1.5rem",
    margin: "7px 0px",
    paddingTop: "20px",
    paddingBottom: "5px",
    color: "white",
  };

  const header: React.CSSProperties = {
    display: "inline",
    fontFamily: "var(--body-font)",
    fontSize: "2rem",
    lineHeight: "2rem",
    fontWeight: "bold",
    paddingTop: "10px",
    color: "white",
    borderBottom: "solid 2px goldenrod",
    paddingBottom: "15px",
  };

  // Text in here
  const topInfo: React.CSSProperties = {
    height: desktop ? "50%" : "100%",
    paddingBottom: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  // image in here
  const bottomInfo: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "50%",
    display: "flex",
    justifyContent: "center",
    opacity: hover && desktop ? 1 : 0,
    transition: "all 1.3s cubic-bezier(0.2, 1, 0.3, 1)",
    transitionDelay: hover ? "0.55s" : "0s",
  };

  const coverWrapper: React.CSSProperties = {
    position: "relative",
    height: "50%",
    width: "50%",
    boxShadow: "2px 2px 5px 1px black",
  };

  // List the name and date;
  const year = props.album.releaseDate.split("-")[0];
  return (
    <li style={style}>
      <div
        style={resizing}
        onMouseEnter={() => {
          if (desktop) setHover(true);
        }}
        onMouseLeave={() => {
          if (desktop) setHover(false);
        }}
        onClick={() => {
          if (!desktop) setClicked(!clicked);
        }}
      >
        <div style={resizedDiv}>
          <div style={albumInfo}>
            <div style={mobileStyle}>
              <div style={dropdownOverlay} />
              <div style={fadeIn}>
                <div style={faded}>
                  <div style={topInfo}>
                    <p style={header}>{props.album.name}</p>
                    <p style={paragraph}>
                      {albumType(props.album)} / {year}
                    </p>
                  </div>
                  <div style={bottomInfo}>
                    <div style={coverWrapper}>
                      <SpotifyCover album={props.album} link={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={desktopStyle}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  background: "var(--primary-gradient)",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: clicked ? 1 : 0,
                  transition: "all 750ms cubic-bezier(0.2, 1, 0.3, 1)",
                }}
              >
                <p
                  style={{
                    display: "inline",
                    fontFamily: "var(--body-font)",
                    fontSize: "1.1rem",
                    lineHeight: "1.1rem",
                    fontWeight: "bold",
                    color: "white",
                    borderBottom: "solid 1px goldenrod",
                    paddingBottom: "10px",
                  }}
                >
                  {props.album.name}
                </p>
                <div
                  style={{
                    position: "relative",
                    marginTop: "10%",
                    height: "25%",
                    width: "25%",
                    display: clicked ? "" : "none",
                  }}
                >
                  <SpotifyIcon url={props.album.externalUrl} />
                </div>
              </div>
            </div>
          </div>
          <SpotifyCover album={props.album} />
        </div>
      </div>
    </li>
  );
}

function albumType(album: Album) {
  if (album.albumType === "single" && album.numTracks > 1) return "EP";
  return album.albumType;
}

function SpotifyIcon({
  url,
  style,
}: {
  url: string;
  style?: React.CSSProperties;
}) {
  const blackCircle: React.CSSProperties = {
    position: "relative",
    top: "3%",
    left: "3%",
    height: "92%",
    width: "92%",
    borderRadius: "50%",
    background: "black",
    zIndex: -1,
    boxShadow: "2px 2px 5px 0px black",
  };

  const link: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
  };

  return (
    <div style={style}>
      <div style={blackCircle} />
      <div style={link}>
        <SpotifyLink url={url} />;
      </div>
    </div>
  );
}

function SpotifyCover({ album, link }: { album: Album; link?: boolean }) {
  const cover: React.CSSProperties = {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    right: "5%",
    bottom: "5%",
    height: "25%",
    width: "25%",
    zIndex: 2,
  };

  if (link) {
    return (
      <>
        <QueryGTE780>
          <>
            <SpotifyIcon url={album.externalUrl} style={iconStyle} />
            <img
              style={cover}
              src={album.images.large.url}
              alt={`${album.name} cover`}
            />
          </>
        </QueryGTE780>
        <QueryLTE780>
          <>
            <SpotifyIcon url={album.externalUrl} style={iconStyle} />
            <img
              style={cover}
              src={album.images.medium.url}
              alt={`${album.name} cover`}
            />
          </>
        </QueryLTE780>
      </>
    );
  }

  return (
    <>
      <QueryGTE780>
        <img
          style={cover}
          src={album.images.large.url}
          alt={`${album.name} cover`}
        />
      </QueryGTE780>
      <QueryLTE780>
        <img
          style={cover}
          src={album.images.medium.url}
          alt={`${album.name} cover`}
        />
      </QueryLTE780>
    </>
  );
}

export default SpotifyAlbum;
