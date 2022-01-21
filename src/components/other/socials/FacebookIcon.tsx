import React, { Component } from "react";

import facebookWhite from "../../../assets/Facebook_White.png";
import IconBase, { IconProps } from "./IconBase";

const FACEBOOK_LINK = "https://www.facebook.com/tctrio";

interface FacebookProps {
  style?: React.CSSProperties;
}

class FacebookIcon extends Component<FacebookProps, {}> {
  render() {
    return (
      <IconBase
        src={facebookWhite}
        href={FACEBOOK_LINK}
        style={this.props.style}
      ></IconBase>
    );
  }
}

export default FacebookIcon;
