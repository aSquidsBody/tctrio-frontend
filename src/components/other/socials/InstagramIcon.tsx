import React, { Component } from "react";

import instagramBlack from "../../../assets/Instagram_Black.png";
import IconBase from "./IconBase";

const INSTAGRAM_LINK = "https://www.instagram.com/tctrio";

interface InstagramProps {
  style?: React.CSSProperties;
}

class InstagramIcon extends Component<InstagramProps, {}> {
  state = {
    hover: false,
  };

  constructor(props: InstagramProps) {
    super(props);

    this.mouseIn = this.mouseIn.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseIn = () => {
    this.setState({ hover: true });
  };

  mouseOut = () => {
    this.setState({ hover: false });
  };

  wrapperStyle = (): React.CSSProperties => {
    return {
      background: this.state.hover ? "#d1d3d6" : "white",
      borderRadius: "35%",
      transition: this.state.hover ? "opacity 0.05s" : "opacity 0.02s",
    };
  };

  iconStyle: React.CSSProperties = {
    ...this.props.style,
  };

  render() {
    return (
      <div
        onMouseEnter={this.mouseIn}
        onMouseLeave={this.mouseOut}
        style={this.wrapperStyle()}
      >
        <IconBase
          src={instagramBlack}
          href={INSTAGRAM_LINK}
          style={this.iconStyle}
        ></IconBase>
      </div>
    );
  }
}

export default InstagramIcon;
