import React, { Component } from "react";
import NavbarDesktop from "../components/Navbar/NavbarDesktop";
import NavbarMobile from "../components/Navbar/NavbarMobile";
import { Desktop, Mobile } from "../components/other/Responsive";
import logoBlack from "../assets/logo_black.png";
import { PAGES } from ".";

class Body extends Component<{ page: string }, {}> {
  componentStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
  };

  contents = (desktop: boolean): React.CSSProperties => {
    return {
      position: "relative",
      minHeight: "calc(100vh - var(--menu-height))",
      width: "100%",
      background: "none",
      paddingTop: desktop ? "0px" : "var(--menu-height)",
      zIndex: 0,
    };
  };

  overlayWrapper: React.CSSProperties = {
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

  overlay: React.CSSProperties = {
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

  render() {
    return (
      <div style={this.componentStyle}>
        <Desktop>
          <>
            <NavbarDesktop links={PAGES} page={this.props.page} />
            <div id="page-contents" style={this.contents(true)}>
              <div style={this.overlayWrapper}>
                <div style={this.overlay} />
              </div>
              {this.props.children}
            </div>
          </>
        </Desktop>
        <Mobile>
          <>
            <NavbarMobile links={PAGES} />
            <div id="page-contents" style={this.contents(false)}>
              <div style={this.overlayWrapper}>
                <div style={this.overlay} />
              </div>
              {this.props.children}
            </div>
          </>
        </Mobile>
      </div>
    );
  }
}

export default Body;
