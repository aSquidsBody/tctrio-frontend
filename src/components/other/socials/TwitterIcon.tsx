import React, { Component } from "react";

import twitterWhite from "../../../assets/Twitter_White_Circle.png";
import IconBase from "./IconBase";

const TWITTER_LINK = "https://twitter.com/tctrio";

interface TwitterProps {
  style?: React.CSSProperties;
}

class TwitterIcon extends Component<TwitterProps, {}> {
  render() {
    return (
      <IconBase
        src={twitterWhite}
        href={TWITTER_LINK}
        style={this.props.style}
      ></IconBase>
    );
  }
}

export default TwitterIcon;
