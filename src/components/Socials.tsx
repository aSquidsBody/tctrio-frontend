import React, { Component } from "react";
// @ts-ignore
import MediaQuery from "react-responsive";

import spotifyBlack from "../assets/Spotify_Black.png";
import youtubeBlack from "../assets/Youtube_Black.png";
import twitterBlack from "../assets/Twitter_Black.png";
import instagramBlack from "../assets/Instagram_Black.png";
import facebookBlack from "../assets/Facebook_Black.png";
import FacebookIcon from "./other/socials/FacebookIcon";
import InstagramIcon from "./other/socials/InstagramIcon";
import SpotifyIcon from "./other/socials/SpotifyIcon";
import TwitterIcon from "./other/socials/TwitterIcon";

const spotify =
  "https://open.spotify.com/artist/63GbQYzf0EbxtI9D23IdrU?si=kLVHVQ3ISASnn7MB7mSvcA&dl_branch=1";

const youtube = "https://www.youtube.com/channel/UCvRNBogmlEFFfBJyKIJqV-g";

const twitter = "https://twitter.com/tctrio";

const instagram = "https://www.instagram.com/tctrio";

const facebook = "https://www.facebook.com/tctrio";

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
