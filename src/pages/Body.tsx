import React, { Component } from "react";
import NavbarDesktop from "../components/Navbar/NavbarDesktop";
import NavbarMobile from "../components/Navbar/NavbarMobile";
import { Desktop, Mobile } from "../components/other/Responsive";
import { PAGES } from ".";

class BodyWrapper extends Component<{ page: JSX.Element }, {}> {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <Desktop>
          <NavbarDesktop links={PAGES} />
        </Desktop>
        <Mobile>
          <NavbarMobile links={PAGES}></NavbarMobile>
        </Mobile>
        <div className="newBody">{this.props.page}</div>
      </div>
    );
  }
}

const Body = ({ children }: { children: JSX.Element }) => {
  return <BodyWrapper page={children} />;
};

export default Body;
