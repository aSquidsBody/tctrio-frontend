import React, { Component } from "react";
import axios from "axios";
import { Track } from "../../types/spotify";
import SpotifyLink from "./SpotifyLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

interface SpotifySongProps {
  track: Track;
  play: (src: string) => Promise<void>;
  pause: () => void;
  playing: boolean;
  name: string;
}

const IMAGE_DIAMETER = 85;
const ROW_PAD = 10;
const BUTTON_DIAMETER = 48;

class SpotifySong extends Component<SpotifySongProps, {}> {
  state = {
    hover: false,
    clicking: false,
  };

  hover = () => this.setState({ hover: true });
  notHover = () => this.setState({ hover: false });

  infoDesktop = () => {
    return (
      <div>
        <h3>{this.props.track.name.toUpperCase()}</h3>
        <p>{this.props.track.album.releaseDate}</p>
      </div>
    );
  };

  component: React.CSSProperties = {
    width: "100%",
    height: `${IMAGE_DIAMETER + 2 * ROW_PAD}px`,
    display: "flex",
    flexDirection: "row",
  };

  hoverable: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
    padding: `${ROW_PAD}px 17px`,
    background: "none",
  };

  whiteBackground = (): React.CSSProperties => {
    return {
      position: "absolute",
      top: "0px",
      left: "0px",
      height: "100%",
      width: "100%",
      background: "white",
      opacity: this.state.hover ? 0.05 : 0,
    };
  };

  playMouseDown = () => {
    document.onmouseup = this.playMouseUp;
    this.setState({ clicking: true });
  };

  playMouseUp = async () => {
    document.onmouseup = null;
    await this.togglePlay();
  };

  togglePlay = async () => {
    if (this.props.playing) this.pause();
    else await this.play();
  };

  play = async () => {
    await this.props.play(this.props.track.previewUrl);
    this.setState({ clicking: false });
  };

  pause = () => {
    this.props.pause();
    this.setState({ clicking: false });
  };

  mainBackground: React.CSSProperties = {
    position: "relative",
  };

  displayRow: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
  };

  imageNameDiv: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  imageDiv: React.CSSProperties = {
    width: IMAGE_DIAMETER + "px",
    height: IMAGE_DIAMETER + "px",
    minWidth: IMAGE_DIAMETER + "px",
    minHeight: IMAGE_DIAMETER + "px",
  };

  image: React.CSSProperties = {
    width: "100%",
    height: "100%",
    // border: "solid 1px rgb(0,0,0,0)",
    boxShadow: "2px 2px 10px 0px black",
  };

  nameLinkDiv: React.CSSProperties = {
    position: "relative",
    margin: "1px 0px 1px 10px",
  };

  nameDiv: React.CSSProperties = {
    fontSize: "1.1rem",
    color: "white",
    boxShadow: "none",
    textShadow: "none",
    fontFamily: "var(--alternate-font)",
    fontWeight: "100",
  };

  spotifyLinkDiv: React.CSSProperties = {
    position: "absolute",
    bottom: "0px",
    width: "25px",
    height: "25px",
  };

  playPositionDiv: React.CSSProperties = {
    position: "absolute",
    height: "100%",
    top: "0px",
    right: "3px",
    width: `${BUTTON_DIAMETER}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  playButtonDiv: React.CSSProperties = {
    position: "relative",
    height: `${BUTTON_DIAMETER - 3}px`,
    width: `${BUTTON_DIAMETER - 3}px`,
    background: "#222",
    borderRadius: "50%",
  };

  correctButtonOffset: React.CSSProperties = {};

  render() {
    if (!this.props.track.name) {
      return null;
    }
    return (
      <div style={this.component}>
        <div
          style={this.hoverable}
          onMouseEnter={this.hover}
          onMouseLeave={this.notHover}
        >
          <div style={this.whiteBackground()} />
          <div style={this.mainBackground}>
            <div style={this.displayRow}>
              <div style={this.imageNameDiv}>
                <div style={this.imageDiv}>
                  <img
                    className="noSelect"
                    style={this.image}
                    src={this.props.track.album.images.medium.url}
                    alt={this.props.track.name}
                  />
                </div>
                <div style={this.nameLinkDiv}>
                  <div style={this.nameDiv}>{this.props.track.name}</div>
                  <div style={this.spotifyLinkDiv}>
                    <SpotifyLink url={this.props.track.externalUrl} />
                  </div>
                </div>
              </div>
              <div style={this.playPositionDiv}>
                <div style={this.playButtonDiv}>
                  <div style={this.correctButtonOffset}>
                    {this.props.playing ? (
                      <FontAwesomeIcon
                        icon={faPauseCircle}
                        color={"var(--spotify-green)"}
                        opacity={this.state.clicking ? 0.8 : 1}
                        size="3x"
                        onMouseDown={this.playMouseDown}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlayCircle}
                        color={"var(--white-color)"}
                        opacity={this.state.clicking ? 0.7 : 1}
                        size="3x"
                        onMouseDown={this.playMouseDown}
                      ></FontAwesomeIcon>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifySong;
