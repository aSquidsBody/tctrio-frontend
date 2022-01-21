import React, { useEffect, useState } from "react";
import Body from "../Body";
import Banner from "../../components/other/Banner";
import Shows from "../../components/about/Shows";

import axios from "axios";

import { ABOUT_URL } from "../../config";
import bandBanner from "../../assets/band3_flat2.png";

import { Mobile, Desktop } from "../../components/other/Responsive";
import tylerPng from "../../assets/tyler_square.png";
import { pageview } from "react-ga";
import CustomHeader from "../../components/CustomHeader";

interface AboutResponse {
  text: string;
}

async function fetchData(setState: (s: string) => void) {
  const res = await axios.get<AboutResponse>(ABOUT_URL);
  setState(res.data.text);
}

interface AboutProps {
  style?: React.CSSProperties;
}

function About(props: AboutProps) {
  const [text, setText] = useState("");

  // fetch data
  useEffect(() => {
    try {
      fetchData(setText);
    } catch (e: any) {
      console.error(e);
    }
  }, [text]);

  function paragraph(text: string) {
    const split = text.split("\n");
    return split.map((subStr, idx) => {
      return (
        <p key={"text_" + idx.toString()} style={paragraphStyle}>
          {subStr}
        </p>
      );
    });
  }

  // style
  const componentStyle: React.CSSProperties = {
    position: "relative",
  };

  const banner: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "280px",
  };

  const bannerOverlay: React.CSSProperties = {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: "1",
    background: "var(--primary-color)",
    opacity: "0.2",
  };

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: "20px",
  };

  const textBanner: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "20px",
  };

  const halfBox: React.CSSProperties = {
    position: "relative",
    height: "auto",
    fontFamily: "var(--body-font)",
    fontSize: "2rem",
    lineHeight: " 3.5rem",
    listStyle: "none",
    color: "black",
  };

  const halfBoxOverlay: React.CSSProperties = {
    position: "absolute",
    bottom: "0%",
    left: "-10%",
    height: "50%",
    width: "120%",
    borderBottom: "solid 1px black",
    borderRight: "solid 1px black",
    borderLeft: "solid 1px black",
    zIndex: -1,
  };

  const paragraphStyle: React.CSSProperties = {
    marginBottom: "1rem",
    fontFamily: "var(--alternate-font)",
    fontSize: "1.2rem",
    textAlign: "center",
  };

  const textCol: React.CSSProperties = {
    gridColumn: "1/3",
    margin: "20px",
  };

  const textBox: React.CSSProperties = {
    /* width: 75%; */
    padding: "0px 30px",
    background: "#f5f5f5",
    color: "black",
    borderRight: "solid 3px #90c4e3",
    mixBlendMode: "multiply",
  };

  const centerBox: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  const centerCol: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const bioTitle: React.CSSProperties = {
    display: "inline-block",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2rem",
    fontFamily: " var(--header-font)",
  };

  const showsCol: React.CSSProperties = {
    gridColumn: "3/4",
    width: "100%",
  };

  const showsBox: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    width: "100%",
  };

  return (
    <Body page={"About"}>
      <div style={componentStyle}>
        <Desktop>
          <div style={banner}>
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
          <div style={{ ...textCol }}>
            <CustomHeader value="Shows"></CustomHeader>
            <div style={showsCol}>
              <div style={showsBox}>
                <Shows />
              </div>
            </div>
            <CustomHeader value="Biography"></CustomHeader>

            <div style={textBox}>
              {/* <div style={centerBox}>
                <h5 style={{ ...bioTitle, ...halfBox }}>
                  <div style={halfBoxOverlay}></div>
                  Biography
                </h5>
              </div> */}
              {paragraph(text)}
            </div>
            <ul style={textBanner}>
              <li style={halfBox}>
                {" "}
                <div style={halfBoxOverlay}></div> Blues Soul
              </li>
              <li style={halfBox}>
                <div style={halfBoxOverlay}></div> Jazz Mentality
              </li>
              <li style={halfBox}>
                {" "}
                <div style={halfBoxOverlay}></div> Rock Attitude
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Body>
  );
}

export default About;
