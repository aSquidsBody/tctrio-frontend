import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import logoBlack from "../assets/logo_black.png";
import NavbarDesktop from "../components/Navbar/NavbarDesktop";
import NavbarMobile from "../components/Navbar/NavbarMobile";
import { Desktop, Mobile } from "../components/other/Responsive";
import { setCookieTimer, shouldShowCookie } from "../utils/cookieInfo";

function Body() {
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    if (shouldShowCookie()) {
      setCookieTimer(Date.now() + 3600);
      setShowCookies(true);
    }
  }, []);

  const componentStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
  };
  const contents: React.CSSProperties = {
    position: "relative",
    minHeight: "calc(100vh - var(--menu-height))",
    width: "100%",
    background: "none",
    paddingTop: useMediaQuery({ minWidth: 650 }) ? "0px" : "var(--menu-height)",
    zIndex: 0,
  };

  const overlayWrapper: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    overflowY: "hidden",
    mixBlendMode: "difference",
    background:
      "linear-gradient(0.3turn, var(--white-color), var(--bwite-color))",
    zIndex: -1,
  };

  const overlay: React.CSSProperties = {
    position: "absolute",
    display: "block",
    backgroundImage: `url(${logoBlack})`,
    backgroundSize: "33%",
    opacity: 0.03,
    transform: "rotate(5deg)",
    height: "100%",
    width: "100%",
    top: "0px",
    left: "0px",
  };

  const cookieBar: React.CSSProperties = {
    display: showCookies ? "flex" : "none",
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100%",
    background: "var(--grey-gradient)",
    fontFamily: "var(--alternate-font)",
    minHeight: "84px",
    alignItems: "center",
  };

  const container: React.CSSProperties = {
    width: "100%",
    maxWidth: "1080px",
    margin: "0px auto",
    height: "100%",
  };

  const innerContainer: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: useMediaQuery({ minWidth: 650 }) ? "row" : "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  const cookieInfo: React.CSSProperties = {
    maxWidth: "800px",
    margin: useMediaQuery({ minWidth: 650 }) ? "20px" : "20px 20px 0px 20px",
    color: "white",
  };

  const buttonWrapper: React.CSSProperties = {
    margin: "auto 0px",
  };

  return (
    <div id="home" style={componentStyle}>
      <Desktop>
        <NavbarDesktop />
      </Desktop>
      <Mobile>
        <NavbarMobile />
      </Mobile>
      <div id="page-contents" style={contents}>
        <div style={overlayWrapper}>
          <div style={overlay} />
        </div>
        <Outlet />
      </div>
      <div style={cookieBar}>
        <div style={container}>
          <div style={innerContainer}>
            <div style={cookieInfo}>
              This site uses browser cookies to mange browser experience and to
              measure its audience. By continuing to use this website or
              clicking on "Accept & Close", you consent to the use of cookies on
              this site.
            </div>
            <div style={buttonWrapper}>
              <CookieButton mouseDown={() => setShowCookies(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CookieButtonProps {
  mouseDown: () => void;
}

function CookieButton(props: CookieButtonProps) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);

  function mousedown() {
    setSelected(true);
    document.onmouseup = () => {
      props.mouseDown();
      setSelected(false);
    };
  }

  const button: React.CSSProperties = {
    color: "white",
    background: selected
      ? "#27324b"
      : hover
      ? "#1f283b"
      : "var(--primary-color)",
    fontSize: "1.1rem",
    fontWeight: "lighter",
    padding: "10px 20px",
    margin: "10px 20px",
    border: "solid 1px rgb(255, 255, 255, 0.15)",
    cursor: "pointer",
  };

  return (
    <input
      style={button}
      type="button"
      value={"Accept & Close"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={mousedown}
    />
  );
}

export default Body;
