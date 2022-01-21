import React, { Component } from "react";
import { Track } from "../../types/spotify";
import SpotifySong from "../media/SpotifySong";
import ScrollBox from "../other/Scrollbox";
import VolumeControl from "../media/VolumeControl";
import { BACKGROUND_GREY_GRADIENT } from "../../config";

interface CardProps {
  tracks: Track[];
  style?: React.CSSProperties;
}

class MusicCard extends Component<CardProps, {}> {
  componentStyle: React.CSSProperties = {
    background: BACKGROUND_GREY_GRADIENT,
    borderRadius: "10px",
    paddingTop: "4px",
  };
  playerRef: React.RefObject<HTMLAudioElement>;
  state: { src: string; playing: string };

  constructor(props: CardProps) {
    super(props);

    this.changeSong = this.changeSong.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.playerRef = React.createRef();
    this.state = {
      src: "",
      playing: "",
    };

    if (this.props.style) {
      this.componentStyle = {
        ...this.props.style,
      };
      this.componentStyle.background =
        this.componentStyle.background || BACKGROUND_GREY_GRADIENT;
      this.componentStyle.display = "inline-block";
    }
  }

  changeSong = (src: string) => {
    if (this.state.src !== src && this.playerRef.current) {
      const player = this.playerRef.current;

      player.src = src;
      this.setState({ src });
    }
  };

  play = async (src: string) => {
    if (!this.playerRef.current) {
      return;
    }
    const player = this.playerRef.current;

    // Check if song has changed
    if (this.state.src !== src) {
      this.pause();
      this.changeSong(src);
    }

    try {
      await player.play();
      this.setState({ playing: src });
    } catch (err) {
      console.error("Could not play song");
    }
  };

  pause = () => {
    if (!this.playerRef.current) {
      return;
    }
    const player = this.playerRef.current;

    try {
      player.pause();
      this.setState({ playing: "" });
    } catch (err) {
      console.error("Could not pause");
    }
  };

  isPlaying = (src: string) => {
    return this.state.playing === src;
  };

  // styles
  listDiv: React.CSSProperties = {
    maxHeight: "350px",
  };

  volumeDiv: React.CSSProperties = {
    padding: "30px 30px 30px 30px",
  };

  divLine: React.CSSProperties = {
    height: "1px",
    width: "90%",
    margin: "10px auto 0px auto",
    background: "#555",
  };

  spotifySongDiv: React.CSSProperties = {};

  scrollBox: React.CSSProperties = {
    maxHeight: "350px",
  };

  render() {
    if (this.props.tracks.length === 0) return null;
    return (
      <div style={this.componentStyle}>
        <audio ref={this.playerRef}>
          <source src={this.state.src} type="audio/mpeg" />
        </audio>
        <div style={this.listDiv}>
          <ScrollBox style={this.scrollBox}>
            {this.props.tracks.slice(0, 2).map((track) => {
              return (
                <div style={this.spotifySongDiv} key={"highlight" + track.id}>
                  <SpotifySong
                    track={track}
                    play={this.play}
                    pause={this.pause}
                    playing={this.isPlaying(track.previewUrl)}
                    name={this.state.src}
                  />
                </div>
              );
            })}
          </ScrollBox>
        </div>

        <div style={this.divLine} />
        <div style={this.volumeDiv}>
          <VolumeControl player={this.playerRef}></VolumeControl>
        </div>
      </div>
    );
  }
}

export default MusicCard;
