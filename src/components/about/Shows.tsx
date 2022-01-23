import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Show } from "../../types/show";
import { convertZeros, formatDate } from "../../utils/formatter";
import { SHOWS_URL } from "../../config";
import axios from "axios";
import AboutShow from "./Show";

interface ShowsListProps {
  showsList: Show[];
  alt: boolean;
  style?: React.CSSProperties;
}

function ShowsList(props: ShowsListProps) {
  // styles
  const ulStyle: React.CSSProperties = {
    width: "100%",
  };

  const noShow: React.CSSProperties = {
    fontFamily: "var(--body-font)",
    textAlign: "center",
  };

  // dynamic styles
  const liStyle = (last: boolean): React.CSSProperties => {
    return {
      width: "100%",
      listStyle: "none",
      padding: "10px",
      borderBottom: last
        ? "none"
        : props.alt
        ? "solid 1px black"
        : "solid 1px white",
    };
  };

  return (
    <div style={props.style}>
      {props.showsList.length > 0 ? (
        <ul style={ulStyle}>
          {props.showsList.map((show, idx) => {
            return (
              <li
                style={liStyle(idx === props.showsList.length - 1)}
                key={show.name}
              >
                <AboutShow show={show} alt={props.alt} />
              </li>
            );
          })}
        </ul>
      ) : (
        <ul style={ulStyle}>
          <li style={liStyle(true)}>
            <p style={noShow}>...None to display...</p>
          </li>
        </ul>
      )}
    </div>
  );
}

interface ShowsResponse {
  upcomingShows: Show[];
  pastShows: Show[];
}

async function fetchData(
  setUpcomingShows: (s: Show[]) => void,
  setPastShows: (s: Show[]) => void
) {
  const res = await axios.get<ShowsResponse>(SHOWS_URL);
  setUpcomingShows(res.data.upcomingShows);
  setPastShows(res.data.pastShows);
}

interface ShowsProps {
  style?: React.CSSProperties;
}

function Shows(props: ShowsProps) {
  const [upcomingShows, setUpcomingShows] = useState([] as Show[]);
  const [pastShows, setPastShows] = useState([] as Show[]);

  useEffect(() => {
    try {
      fetchData(setUpcomingShows, setPastShows);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  // styles
  const componentStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const h5Style: React.CSSProperties = {
    fontSize: "2rem",
    fontFamily: "var(--header-font)",
  };

  const column: React.CSSProperties = {
    position: "relative",
    marginBottom: "10px",
    padding: "10px",
    mixBlendMode: "multiply",
    color: "white",
    width: "100%",
  };

  const columnAlt: React.CSSProperties = {
    ...column,
    color: "#333",
  };

  const columnOverlay: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    zIndex: "-1",
    background: "rgb(90, 90, 90)",
  };

  const columnAltOverlay: React.CSSProperties = {
    ...columnOverlay,
    background: "var(--white-color)",
  };

  const barTitle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "2rem",
    fontFamily: "var(--header-font)",
  };

  return (
    <div style={props.style}>
      <div style={componentStyle}>
        <div style={column}>
          <div style={columnOverlay} />
          <h5 style={barTitle}>Upcoming shows</h5>
          <ShowsList showsList={upcomingShows} alt={false}></ShowsList>
        </div>
        <div style={columnAlt}>
          <div style={columnAltOverlay} />
          <h5 style={barTitle}>Past Shows</h5>
          <ShowsList showsList={pastShows} alt={true}></ShowsList>
        </div>
      </div>
    </div>
  );
}

export default Shows;
