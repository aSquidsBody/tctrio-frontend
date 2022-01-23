import React, { useEffect, useRef, useState } from "react";
import { Show } from "../../types/show";
import { convertZeros, formatDate } from "../../utils/formatter";

interface AboutShowProps {
  show: Show;
  alt: boolean;
  style?: React.CSSProperties;
}

function AboutShow(props: AboutShowProps) {
  const [hovering, setHovering] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef: React.RefObject<HTMLDivElement> = useRef(null);

  // set the height of the content
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    setContentHeight(content.clientHeight);
  }, [contentHeight]);

  // styles
  const collapseStyle = (): React.CSSProperties => {
    return {
      height: expanded ? contentHeight.toString() + "px" : "0px",
      overflowY: "hidden",
      transition: "height 0.1s linear",
    };
  };

  const minPadding: React.CSSProperties = {
    width: "100%",
    padding: "2px 0px",
  };

  const titleWrapper: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const expandStyle = (): React.CSSProperties => {
    return {
      fontFamily: "var(--body-font)",
      marginLeft: expanded ? "5px" : "15px",
      color: props.alt ? "#ea9a00" : "var(--selected-color)",
      opacity: hovering ? 0.75 : 1,
      cursor: "pointer",
    };
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.4rem",
    fontFamily: "var(--header-font)",
    display: "inline",
  };

  const locationStyle: React.CSSProperties = {
    fontFamily: "var(--body-font)",
    fontSize: "1.25rem",
    margin: "3px 0px",
  };

  const timeStyle: React.CSSProperties = {
    fontFamily: "var(--body-font)",
    fontSize: "1.25rem",
    textAlign: "end",
  };

  const dateStyle: React.CSSProperties = {
    fontFamily: "var(--body-font)",
    fontSize: "1.25rem",
    textAlign: "end",
  };

  return (
    <div style={props.style}>
      <div style={minPadding} ref={contentRef}>
        <div style={titleWrapper}>
          <p style={titleStyle}>{props.show.name}</p>{" "}
          <p
            className="noSelect"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={expandStyle()}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "collapse" : "expand"}
          </p>
        </div>
        <div style={collapseStyle()}>
          <p style={locationStyle}>{props.show.location || "TBA"}</p>
          <p style={timeStyle}>{props.show.time || "TBA"}</p>
        </div>
        <p style={dateStyle}>{convertZeros(formatDate(props.show.date))}</p>
      </div>
    </div>
  );
}

export default AboutShow;
