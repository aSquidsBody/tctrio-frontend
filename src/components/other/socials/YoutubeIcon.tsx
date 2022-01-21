import React from "react";

import twitterWhite from "../../../assets/Twitter_White_Circle.png";
import IconBase, { IconProps } from "./IconBase";

const YOUTUBE_LINK = "https://www.youtube.com/channel/UCvRNBogmlEFFfBJyKIJqV-g";

interface YoutubeProps {
  style?: React.CSSProperties;
}

class YoutubeIcon extends IconBase {
  constructor(props: YoutubeProps) {
    const iconProps: IconProps = {
      src: twitterWhite,
      href: YOUTUBE_LINK,
      style: {
        ...props.style,
      },
    };
    super(iconProps);
  }
}

export default YoutubeIcon;
