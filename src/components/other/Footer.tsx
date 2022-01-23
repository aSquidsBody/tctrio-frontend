import React, { useState } from "react";
import { YOUTUBE, SPOTIFY, TWITTER, FACEBOOK, INSTAGRAM } from "../../config";
import whiteSig from "../../assets/sig_white.png";

interface FooterLinkProps {
  href: string;
  // value: string,
  style?: React.CSSProperties;
  children: JSX.Element | string;
}

function FooterLink(props: FooterLinkProps) {
  const [hovering, setHovering] = useState(false);

  const aStyle = (): React.CSSProperties => {
    return {
      color: hovering ? "#d4d4d4" : "white",
      fontFamily: "var(--alternate-font)",
      fontSize: "1rem",
      fontWeight: "bold",
    };
  };

  return (
    <div
      style={props.style}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <a href={props.href} style={aStyle()}>
        {props.children}
      </a>
    </div>
  );
}

interface FooterProps {
  style?: React.CSSProperties;
}

function Footer(props: FooterProps) {
  const maxWidth: React.CSSProperties = {
    width: "100%",
  };

  const center: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const ulStyle: React.CSSProperties = {
    marginRight: "10px",
    padding: "20px 0px 20px 10px",
    borderLeft: "solid 3px white",
  };

  const liStyle: React.CSSProperties = {
    margin: "5px 0px",
    listStyle: "none",
  };

  const sigDiv: React.CSSProperties = {
    position: "relative",
    height: "80px",
    width: "calc(80px * (1200 / 675))",
  };

  const imgStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
  };

  const footerText: React.CSSProperties = {
    color: "white",
    fontFamily: "var(--alternate-font)",
  };

  return (
    <div style={props.style}>
      <div style={maxWidth}>
        <div className="container">
          <div style={center}>
            <div>
              <div style={sigDiv}>
                <img src={whiteSig} alt="Signature" style={imgStyle} />
              </div>
              <p style={footerText}>Text goes here</p>
            </div>

            <ul style={ulStyle}>
              <li style={liStyle}>
                <FooterLink href={FACEBOOK}>Facebook</FooterLink>
              </li>
              <li style={liStyle}>
                <FooterLink href={TWITTER}>Twitter</FooterLink>
              </li>
              <li style={liStyle}>
                <FooterLink href={INSTAGRAM}>Instagram</FooterLink>
              </li>
              <li style={liStyle}>
                <FooterLink href={SPOTIFY}>Spotify</FooterLink>
              </li>
              <li style={liStyle}>
                <FooterLink href={YOUTUBE}>Youtube</FooterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
