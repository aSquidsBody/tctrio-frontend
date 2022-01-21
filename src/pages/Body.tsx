import React, { Component } from "react";
import NavbarDesktop from "../components/Navbar/NavbarDesktop";
import NavbarMobile from "../components/Navbar/NavbarMobile";
import { Desktop, Mobile } from "../components/other/Responsive";
import { PAGES } from ".";

class Body extends Component<{ page: string }, {}> {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <Desktop>
          <NavbarDesktop links={PAGES} page={this.props.page} />
        </Desktop>
        <Mobile>
          <NavbarMobile links={PAGES}></NavbarMobile>
        </Mobile>
        <div className="newBody">{this.props.children}</div>
      </div>
    );
  }
}

export default Body;
