import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { clearSelection } from "../../utils/deselect";

interface VolumeProps {
  player: React.RefObject<HTMLAudioElement>;
  initialValue?: number;
  style?: React.CSSProperties;
}

const VOLUME_HEIGHT = "100%";
const HANDLE_RADIUS = 7;
const MAX_LEVEL = 100;
const MAX_VOLUME = 0.7;
const INITIAL_LEVEL = 50;
// const LOG_BASE = 40;

// volumeFunc maps [0, MAX_LEVEL] to [0, 1]
function volumeFunc(x: number) {
  // return logVolume(x);
  return expVolume(x);
}

function expVolume(x: number) {
  const volume = Math.exp((x * Math.log(1 + MAX_VOLUME)) / MAX_LEVEL) - 1;
  return Math.max(Math.min(volume, MAX_VOLUME), 0);
}

// const log = (x: number) => {
//   return Math.log(x) / Math.log(LOG_BASE);
// };
// const doubleLog = (x: number) => log(log(x));

// const logVolume = (x: number) => {
//   const dLog = doubleLog(x + LOG_BASE) / doubleLog(MAX_LEVEL + LOG_BASE);

//   return Math.max(Math.min(dLog, MAX_LEVEL), 0);
// };

class VolumeControl extends Component<VolumeProps, {}> {
  handleRef: React.RefObject<HTMLDivElement>;
  selectorRef: React.RefObject<HTMLDivElement>;
  playerRef: React.RefObject<HTMLAudioElement>;
  greenRef: React.RefObject<HTMLDivElement>;
  componentStyle: React.CSSProperties = {
    height: VOLUME_HEIGHT,
    position: "relative",
  };
  state: {
    level: number; // Percent value; an abstraction of the pixel value
    hover: boolean;
    muteHover: boolean;
    muteLevel: number;
    muted: boolean;
    selected: boolean;
  };

  constructor(props: VolumeProps) {
    super(props);

    // Div ref to access position values
    this.handleRef = React.createRef();
    this.selectorRef = React.createRef();
    this.greenRef = React.createRef();

    // Player ref to modify volume
    this.playerRef = props.player;

    // Volume level state is variable
    this.state = {
      level: this.props.initialValue || INITIAL_LEVEL,
      muteLevel: this.props.initialValue || INITIAL_LEVEL,
      hover: false,
      muteHover: false,
      muted: false,
      selected: false,
    };

    // Style for the component
    if (this.props.style) {
      this.componentStyle = {
        ...this.props.style,
      };
      this.componentStyle.height = this.componentStyle.height || VOLUME_HEIGHT;
      this.componentStyle.width = this.componentStyle.width || "100%";
    }
  }

  componentDidMount() {
    const player = this.playerRef.current;
    if (player) {
      player.volume = INITIAL_LEVEL / 100;
    }
  }

  setVolume = (level: number) => {
    if (!this.playerRef.current) {
      return;
    }
    this.playerRef.current.volume = volumeFunc(level);
    this.setState({ level, muted: level <= 0 });
  };

  volume2pixel(volume: number) {
    if (!this.selectorRef.current) {
      return 0;
    }
    const selector = this.selectorRef.current;
    const width = selector.clientWidth;
    return Math.min(
      (width * volume) / MAX_LEVEL - HANDLE_RADIUS,
      width - HANDLE_RADIUS
    );
  }

  pixel2volume(pixel: number) {
    if (!this.selectorRef.current) {
      return 0;
    }
    const width = this.selectorRef.current.clientWidth;
    return ((pixel + HANDLE_RADIUS) * MAX_LEVEL) / width;
  }

  // toggle hover state
  hover = () => this.setState({ hover: true });
  notHover = () => this.setState({ hover: false });

  // grab the handle
  select = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setPosition(e);
    document.onmouseup = this.notSelect;
    document.onmousemove = this.slide;
    this.setState({ selected: true });
  };

  touchSelect = (e: React.TouchEvent<HTMLDivElement>) => {
    this.setTouchPosition(e);
    document.ontouchend = this.notTouchSelect;
    document.ontouchmove = this.touchSlide;
    console.log("Select");
    this.setState({ selected: true });
  };

  notSelect = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    this.setState({ selected: undefined });
  };

  notTouchSelect = () => {
    console.log("De-select");

    document.ontouchend = null;
    document.ontouchmove = null;
    this.setState({ selected: undefined });
  };

  // slide the handle
  slide = (e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clearSelection();

    this.setPosition(e);
  };

  touchSlide = (e: TouchEvent) => {
    console.log("slide");
    this.setTouchPosition(e);
  };

  setPosition = (
    e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!this.handleRef.current || !this.selectorRef.current) {
      return;
    }
    const handle = this.handleRef.current;
    const selector = this.selectorRef.current;

    const target = selector as HTMLElement; // Need to get bounding box
    const bounds = target.getBoundingClientRect();

    var mousePixel = Math.min(
      Math.max(e.clientX - bounds.left - HANDLE_RADIUS, -HANDLE_RADIUS),
      selector.clientWidth - HANDLE_RADIUS
    );

    handle.style.left = `${mousePixel}px`;
    this.setVolume(this.pixel2volume(mousePixel));
  };

  setTouchPosition = (e: TouchEvent | React.TouchEvent<HTMLDivElement>) => {
    if (!this.handleRef.current || !this.selectorRef.current) {
      return;
    }
    const handle = this.handleRef.current;
    const selector = this.selectorRef.current;

    const target = selector as HTMLElement; // Need to get bounding box
    const bounds = target.getBoundingClientRect();

    var mousePixel = Math.min(
      Math.max(
        e.touches[0].clientX - bounds.left - HANDLE_RADIUS,
        -HANDLE_RADIUS
      ),
      selector.clientWidth - HANDLE_RADIUS
    );

    handle.style.left = `${mousePixel}px`;
    this.setVolume(this.pixel2volume(mousePixel));
  };

  mute = () => {
    if (!this.handleRef.current) {
      return;
    }
    const handle = this.handleRef.current;
    this.setState({ muted: true, muteLevel: this.state.level });
    this.setVolume(0);
    handle.style.left = `${this.volume2pixel(0)}px`;
  };

  unmute = () => {
    if (!this.handleRef.current) {
      return;
    }
    const handle = this.handleRef.current;
    this.setState({ muted: false });
    this.setVolume(this.state.muteLevel);
    handle.style.left = `${this.volume2pixel(this.state.muteLevel)}px`;
  };

  toggleMute = () => {
    if (this.state.muted) this.unmute();
    else this.mute();
  };

  componentRow: React.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  // sliderWrapper will center the volume slider to the center of the component
  sliderWrapper: React.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  // Hover over sliderSelector to trigger the hover effect (taller than the
  // visible slider)
  sliderSelector: React.CSSProperties = {
    position: "relative",
    height: "14px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  // Volume bar
  slider: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "4px",
    background: "#aaa",
    borderRadius: "2px",
  };

  leftBar = (): React.CSSProperties => {
    return {
      position: "absolute",
      top: "0px",
      left: "0px",
      height: "4px",
      width: this.handleRef.current
        ? `${this.volume2pixel(this.state.level) + HANDLE_RADIUS}px`
        : "50%",
      borderRadius: "2px",
      background:
        this.state.hover || this.state.selected
          ? "var(--selected-color)"
          : "var(--white-color)",
    };
  };

  iconStyle: React.CSSProperties = {
    height: "20px",
    width: "32px",
    paddingLeft: "8px",
  };

  // Handle to change volume
  handle = (): React.CSSProperties => {
    return {
      position: "absolute",
      top: "-5px",
      left: `calc(${(100 * INITIAL_LEVEL) / MAX_LEVEL}% - ${HANDLE_RADIUS}px)`,
      height: `${2 * HANDLE_RADIUS}px`,
      width: `${2 * HANDLE_RADIUS}px`,
      background: "white",
      borderRadius: "50%",
      visibility:
        this.state.hover || this.state.selected ? "visible" : "collapse",
    };
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <div style={this.componentRow}>
          <div style={this.sliderWrapper}>
            <div
              id="volume-selector"
              style={this.sliderSelector}
              ref={this.selectorRef}
              onMouseEnter={this.hover}
              onMouseLeave={this.notHover}
              onMouseDown={this.select}
              onMouseUp={this.notSelect}
              onTouchStart={this.touchSelect}
            >
              <div style={this.slider}>
                <div style={this.leftBar()}></div>
                <div ref={this.handleRef} style={this.handle()} />
              </div>
            </div>
          </div>
          <FontAwesomeIcon
            icon={this.state.level === 0 ? faVolumeMute : faVolumeUp}
            color={this.state.muteHover ? "white" : "#ddd"}
            style={this.iconStyle}
            onMouseEnter={() => this.setState({ muteHover: true, hover: true })}
            onMouseLeave={() =>
              this.setState({ muteHover: false, hover: false })
            }
            onClick={this.toggleMute}
          ></FontAwesomeIcon>
        </div>
      </div>
    );
  }
}

export default VolumeControl;
