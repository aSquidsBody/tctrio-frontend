import React, { Component } from "react";

import VolumeControl from "./VolumeControl";

class SpotifyPreview extends Component<{ src: string }> {
  player: React.RefObject<HTMLAudioElement>;
  volume: React.RefObject<HTMLInputElement>;
  state = {
    volume: 50,
  };

  constructor(props: any) {
    super(props);
    this.player = React.createRef();
    this.volume = React.createRef();
  }

  play = async () => {
    if (!this.player.current) {
      return;
    }

    const player = this.player.current;
    try {
      await player.play();
    } catch (err) {}
  };

  pause = async () => {
    if (!this.player.current) {
      return;
    }

    const player = this.player.current;
    try {
      player.pause();
    } catch (err) {}
  };

  togglePlay = async () => {
    if (!this.player.current) {
      return;
    }

    const player = this.player.current;
    if (player.paused) {
      await this.play();
    } else {
      this.pause();
    }
  };

  changeVolume = () => {
    if (!this.volume.current || !this.player.current) {
      return;
    }

    const volume = this.volume.current;
    const player = this.player.current;

    const newVolume = parseFloat(volume.value);
    player.volume = newVolume / 100;
    this.setState({
      volume: newVolume,
    });
  };

  component: React.CSSProperties = {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-around",
  };

  render() {
    return (
      <div style={this.component}>
        <audio ref={this.player}>
          <source src={this.props.src} type="audio/mpeg" />
        </audio>
        <button style={{ display: "inline" }} onClick={this.togglePlay}>
          Play
        </button>
        <VolumeControl player={this.player} />
      </div>
    );
  }
}

export default SpotifyPreview;
