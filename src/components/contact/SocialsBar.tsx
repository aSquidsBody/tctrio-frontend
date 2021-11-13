import { Component } from "react";
import { YOUTUBE, SPOTIFY, TWITTER, INSTAGRAM, FACEBOOK } from "../../config";

import classNames from "classnames";

import spotifyBlack from "../../assets/Spotify_Black.png";
import youtubeBlack from "../../assets/Youtube_Black.png";
import twitterBlack from "../../assets/Twitter_Black.png";
import instagramBlack from "../../assets/Instagram_Black.png";
import facebookBlack from "../../assets/Facebook_Black.png";

import styles from "./styles/SocialsBar.module.css";

class SocialsBar extends Component {
  state = {
    socials: [
      {
        name: "facebook",
        img: facebookBlack,
        url: FACEBOOK,
        at: "@tctrio",
      },
      {
        name: "instagram",
        img: instagramBlack,
        url: INSTAGRAM,
        at: "@tctrio",
      },
      {
        name: "twitter",
        img: twitterBlack,
        url: TWITTER,
        at: "@tctrio",
      },
    ],
  };

  socials = () => {
    return this.state.socials.map(({ name, img, url, at }) => {
      return (
        <li key={"socialsBar+" + name}>
          <div className={styles.item}>
            <img src={img} alt={`${name} logo`} />
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {""}
            </a>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.gold}>
          <div className={classNames(styles.content, "container")}>
            <div className={styles.followText}>
              <div>
                <p>Or message me @tctrio</p>
              </div>
            </div>
            <ul>{this.socials()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialsBar;
