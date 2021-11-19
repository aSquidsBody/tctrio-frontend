import React, { Component } from "react";
// @ts-ignore
import MediaQuery from "react-responsive";

import styles from "../styles/Socials.module.css";
import spotifyBlack from "../assets/Spotify_Black.png";
import youtubeBlack from "../assets/Youtube_Black.png";
import twitterBlack from "../assets/Twitter_Black.png";
import instagramBlack from "../assets/Instagram_Black.png";
import facebookBlack from "../assets/Facebook_Black.png";

const spotify =
  "https://open.spotify.com/artist/63GbQYzf0EbxtI9D23IdrU?si=kLVHVQ3ISASnn7MB7mSvcA&dl_branch=1";

const youtube = "https://www.youtube.com/channel/UCvRNBogmlEFFfBJyKIJqV-g";

const twitter = "https://twitter.com/tctrio";

const instagram = "https://www.instagram.com/tctrio";

const facebook = "https://www.facebook.com/tctrio";

class Socials extends Component {
  socialDesktop = (href: string, imgSrc: string) => {
    return (
      <div className={styles.socialDesktop}>
        <a href={href} target="_blank" rel="noreferrer" className={styles.link}>
          {""}
        </a>
        <img src={imgSrc} alt="Facebook Logo" className={styles.icon} />
      </div>
    );
  };

  socialMobile = (href: string, imgSrc: string) => {
    return (
      <div className={styles.socialMobile}>
        <a href={href} target="_blank" rel="noreferrer" className={styles.link}>
          {""}
        </a>
        <img src={imgSrc} alt="Facebook Logo" className={styles.icon} />
      </div>
    );
  };

  render() {
    return (
      <MediaQuery maxWidth={650}>
        {(matches) =>
          matches ? (
            <div className={styles.componentMobile}>
              {this.socialMobile(facebook, facebookBlack)}
              {this.socialMobile(instagram, instagramBlack)}
              {this.socialMobile(spotify, spotifyBlack)}
              {this.socialMobile(youtube, youtubeBlack)}
              {this.socialMobile(twitter, twitterBlack)}
            </div>
          ) : (
            <div className={styles.componentDesktop}>
              {this.socialDesktop(facebook, facebookBlack)}
              {this.socialDesktop(instagram, instagramBlack)}
              {this.socialDesktop(spotify, spotifyBlack)}
              {this.socialDesktop(youtube, youtubeBlack)}
              {this.socialDesktop(twitter, twitterBlack)}
            </div>
          )
        }
      </MediaQuery>
    );
  }
}

export default Socials;
