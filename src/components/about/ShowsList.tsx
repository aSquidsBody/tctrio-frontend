import { Show } from "../../types/show";
import AboutShow from "./Show";

interface ShowsListProps {
  showsList: Show[];
  alt: boolean;
  title: string;
  style?: React.CSSProperties;
}

export function ShowsList(props: ShowsListProps) {
  // styles
  const ulStyle: React.CSSProperties = {
    width: "100%",
  };

  const noShow: React.CSSProperties = {
    fontFamily: "var(--body-font)",
    textAlign: "center",
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
      <div style={props.alt ? columnAlt : column}>
        <div style={props.alt ? columnAltOverlay : columnOverlay} />
        <h5 style={barTitle}>{props.title}</h5>
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
      </div>
    </div>
  );
}
