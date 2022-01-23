import classNames from "classnames";
import React, { Component } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import FacebookIcon from "../other/socials/FacebookIcon";
import SpotifyIcon from "../other/socials/SpotifyIcon";
import InstagramIcon from "../other/socials/InstagramIcon";
import TwitterIcon from "../other/socials/TwitterIcon";
import whiteSig from "../../assets/sig_white.png";

interface NavBarProps {
  links: { endpoint: string; name: string }[];
  page: string;
}

class NavbarDesktop extends Component<NavBarProps, {}> {
  state: { hover: string };

  constructor(props: NavBarProps) {
    super(props);

    this.state = {
      hover: "",
    };
  }

  componentStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "var(--menu-height)",
    backgroundColor: "var(--primary-color)",
    zIndex: 1,
  };

  menuStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
  };

  imageWrapper: React.CSSProperties = {
    position: "relative",
    height: "var(--menu-height)",
    width: "calc(1200 / 675 * 80px)",
  };

  imageStyle: React.CSSProperties = {
    position: "absolute",
    height: "80px",
    width: "calc(1200 / 675 * 80px)",
    top: "-9px",
    left: "0px",
  };

  right: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    right: "0px",
    display: "flex",
    flexDirection: "row",
  };

  socialList: React.CSSProperties = {
    margin: "auto 0px",
    display: "flex",
    flexDirection: "row",
  };

  liIconStyle: React.CSSProperties = {
    listStyle: "none",
    padding: "0rem 0.5rem",
  };

  iconStyle: React.CSSProperties = {
    height: "calc(var(--menu-height) / 2)",
    width: "calc(var(--menu-height) / 2)",
  };

  navList: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    height: "var(--menu-height)",
    lineHeight: "var(--menu-height)",
  };

  liStyle: React.CSSProperties = {
    listStyle: "none",
    padding: "0rem 0.9rem",
  };

  linkStyle = (name: string): React.CSSProperties => {
    return {
      fontSize: "1.4rem",
      fontFamily: "var(--header-font)",
      color:
        name === this.props.page ? "var(--vice-blue)" : "var(--white-color)",
      opacity: this.state.hover === name ? 0.8 : 1,
      transition: this.state.hover === name ? "opacity 0.05s" : "opacity 0.02s",
    };
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <div className={classNames("noSelect", "container")}>
          <div style={this.menuStyle}>
            <div style={this.imageWrapper}>
              <img
                src={whiteSig}
                alt="Tyler's Signature"
                style={this.imageStyle}
              />
            </div>
            <div style={this.right}>
              <ul style={this.socialList}>
                <li style={this.liIconStyle}>
                  <FacebookIcon style={this.iconStyle} />
                </li>
                <li style={this.liIconStyle}>
                  <SpotifyIcon style={this.iconStyle} />
                </li>
                <li style={this.liIconStyle}>
                  <InstagramIcon style={this.iconStyle} />
                </li>
                <li style={this.liIconStyle}>
                  <TwitterIcon style={this.iconStyle} />
                </li>
              </ul>
              <ul style={this.navList}>
                {this.props.links.map(
                  ({ endpoint, name }: { endpoint: string; name: string }) => {
                    return (
                      <li key={endpoint} style={this.liStyle}>
                        <Link
                          to={endpoint}
                          style={this.linkStyle(name)}
                          onMouseEnter={() => this.setState({ hover: name })}
                          onMouseLeave={() => this.setState({ hover: "" })}
                        >
                          {name.toUpperCase()}
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarDesktop;
