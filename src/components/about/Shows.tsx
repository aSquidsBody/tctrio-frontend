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
}

function ShowsList(props: ShowsListProps) {
  const liStyle = (last: boolean): React.CSSProperties => {
    return {
      listStyle: "none",
      padding: "10px",
      borderBottom: last
        ? "none"
        : props.alt
        ? "solid 1px black"
        : "solid 1px white",
    };
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.4rem",
    fontFamily: "var(--header-font)",
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
    <>
      {props.showsList.length > 0 ? (
        <ul>
          {props.showsList.map((show, idx) => {
            return (
              <li
                style={liStyle(idx === props.showsList.length - 1)}
                key={show.name}
              >
                <AboutShow show={show}></AboutShow>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
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
    background: "rgb(110, 110, 110)",
  };

  const columnAltOverlay: React.CSSProperties = {
    ...columnOverlay,
    background: "var(--white-color)",
  };

  const centerCol: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const link: React.CSSProperties = {
    background: "var(--primary-color)",
    color: "var(--white-color)",
    padding: "10px 30px",
    fontFamily: " var(--body-font)",
  };

  const barTitle: React.CSSProperties = {
    width: "200px",
    textAlign: "center",
  };

  return (
    <div style={props.style}>
      <div style={componentStyle}>
        <div style={column}>
          <div style={columnOverlay} />
          <h5 style={{ ...barTitle, ...h5Style }}>Upcoming</h5>
          <ShowsList showsList={upcomingShows} alt={false}></ShowsList>
        </div>
        <div style={columnAlt}>
          <div style={columnAltOverlay} />
          <h5
            style={{
              ...barTitle,
              ...h5Style,
            }}
          >
            Past Shows
          </h5>
          <ShowsList showsList={pastShows} alt={true}></ShowsList>
        </div>
      </div>
    </div>
  );
}

export default Shows;
