import axios from "axios";
import React, { useEffect, useState } from "react";
import bandBanner from "../../assets/band3_flat2.png";
import tylerPng from "../../assets/tyler_square.png";
import Shows from "../../components/about/Shows";
import CustomHeader from "../../components/CustomHeader";
import Banner from "../../components/other/Banner";
import { Custom, Desktop, Mobile } from "../../components/other/Responsive";
import { ABOUT_URL } from "../../config";

const CustomMobile = Custom({ maxWidth: 850 });
const CustomDesktop = Custom({ minWidth: 850 });

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // fetch data
  useEffect(() => {
    try {
      fetchData(setText);
    } catch (e: any) {
      console.error(e);
    }
  }, [text]);

  function paragraph(text: string) {
    const split = (text || "...None to display...").split("\n");
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

  const contentDiv = (desktop: boolean): React.CSSProperties => {
    return {
      display: "flex",
      flexDirection: desktop ? "row" : "column",
      alignItems: desktop ? "" : "center",
      paddingBottom: "40px",
    };
  };

  const contentElem = (desktop: boolean): React.CSSProperties => {
    return {
      width: desktop ? "47%" : "94%",
      margin: "0px 1.5%",
    };
  };

  // const textBanner: React.CSSProperties = {
  //   width: "100%",
  //   display: "flex",
  //   justifyContent: "space-evenly",
  //   // background: "goldenrod",
  //   background: "var(--gold-gradient)",
  //   padding: "30px 0px",
  //   mixBlendMode: "multiply",
  //   // borderTop: "solid 5px var(--primary-color)",
  //   // boxShadow: "0px 1px 10px -3px var(--primary-color)",
  //   boxShadow: "0px 1px 10px -3px goldenrod",
  // };

  // const halfBox: React.CSSProperties = {
  //   position: "relative",
  //   height: "auto",
  //   fontFamily: "var(--body-font)",
  //   fontSize: "2rem",
  //   lineHeight: " 3.5rem",
  //   listStyle: "none",
  //   color: "black",
  // };

  // const halfBoxOverlay: React.CSSProperties = {
  //   position: "absolute",
  //   bottom: "0%",
  //   left: "-10%",
  //   height: "50%",
  //   width: "120%",
  //   borderBottom: "solid 1px black",
  //   borderRight: "solid 1px black",
  //   borderLeft: "solid 1px black",
  //   zIndex: 1,
  // };

  const paragraphStyle: React.CSSProperties = {
    marginBottom: "1rem",
    fontFamily: "var(--alternate-font)",
    fontSize: "1.2rem",
    textAlign: "center",
  };

  const textBox: React.CSSProperties = {
    /* width: 75%; */
    padding: "20px 30px",
    background: "#f5f5f5",
    color: "black",
    borderRight: "solid 3px #90c4e3",
    mixBlendMode: "multiply",
  };

  return (
    <div style={componentStyle}>
      <Desktop>
        <>
          <div style={banner}>
            <div style={bannerOverlay} />
            <Banner
              img={bandBanner}
              height="100%"
              width={"1920px"}
              left="0px"
            ></Banner>
          </div>
        </>
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
        <CustomDesktop>
          <div style={contentDiv(true)}>
            <div style={contentElem(true)}>
              <CustomHeader value="Biography" />
              <div style={textBox}>{paragraph(text)}</div>
            </div>
            <div style={contentElem(true)}>
              <CustomHeader value="Shows" />
              <Shows />
            </div>
          </div>
        </CustomDesktop>
        <CustomMobile>
          <div style={contentDiv(false)}>
            <div style={contentElem(false)}>
              <CustomHeader value="Shows" />
              <Shows />
            </div>
            <div style={contentElem(false)}>
              <CustomHeader value="Biography" />
              <div style={textBox}>{paragraph(text)}</div>
            </div>
          </div>
        </CustomMobile>
      </div>
    </div>
  );
}

export default About;
