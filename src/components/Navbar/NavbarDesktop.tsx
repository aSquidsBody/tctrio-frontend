import classNames from "classnames";
import React, { useState } from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import FacebookIcon from "../other/socials/FacebookIcon";
import SpotifyIcon from "../other/socials/SpotifyIcon";
import InstagramIcon from "../other/socials/InstagramIcon";
import TwitterIcon from "../other/socials/TwitterIcon";
import whiteSig from "../../assets/sig_white.png";
import { PAGES, Page } from "../../pages/index";

function NavbarDesktop() {
  const navigate = useNavigate();

  const componentStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "var(--menu-height)",
    backgroundColor: "var(--primary-color)",
    zIndex: 1,
    overflowY: "hidden",
  };

  const menuStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
  };

  const imageWrapper: React.CSSProperties = {
    position: "relative",
    height: "var(--menu-height)",
    width: "calc(1200 / 675 * 80px)",
    cursor: "pointer",
  };

  const imageStyle: React.CSSProperties = {
    position: "absolute",
    height: "80px",
    width: "calc(1200 / 675 * 80px)",
    top: "-9px",
    left: "0px",
  };

  const right: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    right: "0px",
    display: "flex",
    flexDirection: "row",
  };

  const socialList: React.CSSProperties = {
    margin: "auto 0px",
    display: "flex",
    flexDirection: "row",
  };

  const liIconStyle: React.CSSProperties = {
    listStyle: "none",
    padding: "0rem 0.5rem",
  };

  const iconStyle: React.CSSProperties = {
    height: "calc(var(--menu-height) / 2)",
    width: "calc(var(--menu-height) / 2)",
  };

  const navList: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    height: "var(--menu-height)",
    lineHeight: "var(--menu-height)",
  };

  const liStyle: React.CSSProperties = {
    listStyle: "none",
    padding: "0rem 0.9rem",
  };

  return (
    <div style={componentStyle}>
      <div className={classNames("noSelect", "container")}>
        <div style={menuStyle}>
          <div style={imageWrapper} onClick={() => navigate("/")}>
            <img src={whiteSig} alt="Tyler's Signature" style={imageStyle} />
          </div>
          <div style={right}>
            <ul style={socialList}>
              <li style={liIconStyle}>
                <FacebookIcon style={iconStyle} />
              </li>
              <li style={liIconStyle}>
                <SpotifyIcon style={iconStyle} />
              </li>
              <li style={liIconStyle}>
                <InstagramIcon style={iconStyle} />
              </li>
              <li style={liIconStyle}>
                <TwitterIcon style={iconStyle} />
              </li>
            </ul>
            <ul style={navList}>
              {PAGES.map((page: Page) => {
                return (
                  <li key={page.endpoint} style={liStyle}>
                    <NavLink page={page} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  page: Page;
}

function NavLink({ page }: NavLinkProps) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  function selected() {
    return document.location.pathname === page.endpoint;
  }

  // style
  const linkStyle: React.CSSProperties = {
    fontSize: "1.4rem",
    fontFamily: "var(--header-font)",
    color: selected() ? "var(--vice-blue)" : "var(--white-color)",
    opacity: hover ? 0.8 : 1,
    transition: hover ? "opacity 0.05s" : "opacity 0.02s",
    cursor: hover ? "pointer" : "default",
  };

  return (
    <div
      style={linkStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => navigate(page.endpoint)}
    >
      {page.name}
    </div>
  );
}

export default NavbarDesktop;
