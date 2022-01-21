import React, { Component } from "react";
import Body from "../Body";
import Banner from "../../components/other/Banner";
import Shows from "../../components/about/OldShows";

import axios from "axios";
import classNames from "classnames";

import { ABOUT_URL } from "../../config";
import bandBanner from "../../assets/band3_flat2.png";

import { Mobile, Desktop } from "../../components/other/Responsive";
import tylerPng from "../../assets/tyler_square.png";
import styles from "./styles/About.module.css";
import { pageview } from "react-ga";

class About extends Component<{}, {}> {
  // when component mounts, load in media ids from database (no loading in the sub-components)
  state = { text: "" };
  aboutUrl = ABOUT_URL;

  fetchData = async () => {
    try {
      const res = await axios.get<{ text: string }>(this.aboutUrl);
      this.setState({ text: res.data.text });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    pageview(window.location.pathname);
    this.fetchData();
  }

  paragraph = (text: string) => {
    const split = text.split("\n");
    return split.map((subStr, idx) => {
      return (
        <p
          key={"text_" + idx.toString()}
          className={classNames(styles.paragraph)}
        >
          {subStr}
        </p>
      );
    });
  };

  render() {
    return (
      <Body page={"About"}>
        <div className={styles.component}>
          <Desktop>
            <div className={styles.banner}>
              <Banner img={bandBanner} height="100%" width={"1920px"}></Banner>
            </div>
          </Desktop>

          <Mobile>
            <div
              style={{
                margin: "0px",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={tylerPng}
                alt="Tyler"
                style={{
                  width: "75%",
                  marginTop: "10px",
                  height: "75%",
                  borderRadius: "50%",
                }}
              />
            </div>
          </Mobile>
          <div className="container">
            <div className={styles.grid}>
              <div className={classNames(styles.textCol, styles.centerCol)}>
                <div className={styles.textBox}>
                  <div className={styles.centerBox}>
                    <h5 className={classNames(styles.bioTitle, styles.halfBox)}>
                      Biography
                    </h5>
                  </div>

                  {this.paragraph(this.state.text || "")}
                </div>
                <ul className={styles.textBanner}>
                  <li className={styles.halfBox}>Blues Soul</li>
                  <li className={styles.halfBox}>Jazz Mentality</li>
                  <li className={styles.halfBox}>Rock Attitude</li>
                </ul>
              </div>
              <div className={styles.showsCol}>
                <div className={styles.showsBox}>
                  <Shows />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    );
  }
}

export default About;
