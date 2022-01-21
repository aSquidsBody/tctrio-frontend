import React, { Component } from "react";

import logoImg from "../../assets/logo_black.png";

interface LogoProps {
  style?: React.CSSProperties;
}

class Logo extends Component<LogoProps, {}> {
  imgStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
  };

  render() {
    return (
      <div style={this.props.style}>
        <img src={logoImg} alt="Logo" style={this.imgStyle} />
      </div>
    );
  }
}

export default Logo;
