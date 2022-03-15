import React, { useState } from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";
import whiteSig from "../../assets/sig_white.png";
import { PAGES, Page } from "../../pages/index";

function NavbarMobile() {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  /* Common component class for navbar */
  const component: React.CSSProperties = {
    position: "fixed",
    width: "100%",
    height: "var(--menu-height)",
    background: "var(--primary-color)",
    zIndex: 1,
  };

  /* The logo on the nav bar */
  const signature: React.CSSProperties = {
    position: "absolute",
    top: "-13px",
    left: "10px",
    maxHeight: "100px",
    maxWidth: "150px",

    opacity: open ? 0 : 1,
    transition: open ? "opacity 0.4s ease" : "opacity 0.1s ease 0.1s",
  };

  /* Menu (in the navbar for desktop) */
  const menuLinks: React.CSSProperties = {
    textAlign: "center",
    color: "white",
    transition: open ? "opacity 0.4s ease 0.4s" : "opacity 0.4s ease",
    opacity: open ? 1 : 0,
  };

  const liStyle: React.CSSProperties = {
    listStyle: "none",
  };

  /* The invisible toggle button */
  const toggler: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "30px",
    zIndex: 2,
    cursor: "pointer",
    width: "calc(var(--menu-height) - 20px)",
    height: "calc(var(--menu-height) - 10px)",
    opacity: 0,
  };

  /* Visual for the hamburger menu (contains the lines) */
  const hamburger: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    visibility: "visible",
    position: "absolute",
    top: "5.5px",
    right: "30px",
    width: "40px",
    height: "50px",
    zIndex: 1,
  };

  /* The middle hamburger line */
  const lines: React.CSSProperties = {
    visibility: "visible",
    position: "relative",
    width: "100%",
    height: "2px",
    background: "white",
    transition: "all 0.4s ease",
    transform: open ? "rotate(135deg)" : "",
  };

  const topHamburger: React.CSSProperties = {
    content: "",
    position: "absolute",
    top: open ? "0px" : "-10px",
    width: "100%",
    height: "2px",
    background: "white",
    transition: "all 0.4s ease",
    transform: open ? "rotate(90deg)" : "",
  };

  const bottomHamburger: React.CSSProperties = {
    ...topHamburger,
    top: open ? "0px" : "10px",
  };
  const overlay: React.CSSProperties = {
    position: "fixed",
    top: "0px",
    right: "0px",
    width: "100%",
    height: "100%",
    visibility: open ? "visible" : "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  /* The screen overlay when the menu is opened (mobile) */
  const circle: React.CSSProperties = {
    background: "var(--primary-color)",
    borderRadius: "50%",
    minWidth: "200vh",
    height: "200vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: open ? "scale(1)" : "scale(0)",
    transition: open ? "all var(--menu-speed) ease" : "all 0s ease",
  };

  const circleSignature: React.CSSProperties = {
    position: "relative",
    maxHeight: "15%",
    maxWidth: "15%",
    opacity: open ? 1 : 0,
    transition: open ? "opacity 0.4s ease 0.4s" : "opacity 0.4s ease",
    marginBottom: "20px",
  };

  const whiteLine: React.CSSProperties = {
    width: "50vw",
    height: "1px",
    backgroundColor: "white",
    opacity: 0.32,
    margin: "10px 0px",
  };

  const space: React.CSSProperties = {
    height: "var(--header-height)",
    width: "100%",
  };

  return (
    <div style={component}>
      <input type="checkbox" style={toggler} onClick={toggleOpen} />
      <img src={whiteSig} alt="Tyler's Signature" style={signature} />
      <div style={hamburger}>
        <div style={lines}>
          <div style={topHamburger} />
          <div style={bottomHamburger} />
        </div>
      </div>
      <div style={overlay}>
        <div style={circle}>
          <img src={whiteSig} alt="Tyler's Signature" style={circleSignature} />
          <div style={space}>&nbsp;</div>
          <ul style={menuLinks}>
            {PAGES.map((page: Page, idx) => {
              return (
                <li key={page.endpoint} style={liStyle}>
                  <NavLink page={page} onClick={() => setOpen(false)} />
                  {idx !== PAGES.length - 1 ? <div style={whiteLine} /> : null}
                </li>
              );
            })}
          </ul>
          <div style={space}>&nbsp;</div>
          <div style={space}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  page: Page;
  onClick: () => void;
}

function NavLink(props: NavLinkProps) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  function onClick() {
    props.onClick();
    navigate(props.page.endpoint);
  }

  function selected() {
    return document.location.pathname === props.page.endpoint;
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--header-font)",
    fontSize: "1.6rem",
    transition: "color 0.4s ease",
    opacity: hover ? 0.5 : 1,
    padding: "1rem",
    cursor: "pointer",
    color: selected() ? "var(--vice-blue)" : "var(--white-color)",
  };

  return (
    <div
      style={linkStyle}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.page.name.toUpperCase()}
    </div>
  );
}

export default NavbarMobile;
