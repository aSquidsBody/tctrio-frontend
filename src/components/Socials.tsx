import React, { Component } from "react";
import FacebookIcon from "./other/socials/FacebookIcon";
import InstagramIcon from "./other/socials/InstagramIcon";
import TwitterIcon from "./other/socials/TwitterIcon";

interface SocialsProps {
  style?: React.CSSProperties;
}

class Socials extends Component<SocialsProps, {}> {
  iconStyle: React.CSSProperties = {
    height: "30px",
    width: "30px",
  };

  row: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  };

  render() {
    return (
      <div style={this.props.style}>
        <div style={this.row}>
          <FacebookIcon style={this.iconStyle} />
          <InstagramIcon style={this.iconStyle} />
          <TwitterIcon style={this.iconStyle} />
          {/* <SpotifyIcon style={this.iconStyle} /> */}
        </div>
      </div>
    );
  }
}

export default Socials;
