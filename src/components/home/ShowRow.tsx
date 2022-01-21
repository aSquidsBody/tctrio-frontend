import React, { Component } from "react";

import { formatDate, convertZeros } from "../../utils/formatter";
import { Show } from "../../types/show";

interface ShowRowProps {
  show: Show;
}

class ShowRow extends Component<ShowRowProps, {}> {
  name = "TBA";
  location = "TBA";
  date = "TBA";
  time = "Time TBA";
  constructor(props: ShowRowProps) {
    super(props);
    this.set();
  }

  set() {
    this.name = this.props.show.name || this.name;
    this.location = this.props.show.location || this.location;
    this.date = convertZeros(formatDate(this.props.show.date)) || this.date;
    this.time = this.props.show.time || this.time;
  }

  componentStyle: React.CSSProperties = {
    padding: "10px 0px",
    // width: "250px",
    width: "90%",
    margin: "0px 11px",
  };

  listStyle: React.CSSProperties = {
    // height: "6.5rem",
    listStyle: "none",
    color: "#dddddd",
  };

  lineStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "1.5rem",
    lineHeight: "1.5rem",
    wordWrap: "break-word",
  };

  nameLine: React.CSSProperties = {
    ...this.lineStyle,
    color: "var(--white-color)",
    textAlign: "center",
    fontSize: "1.1rem",
    height: "2rem",
  };

  locationLine: React.CSSProperties = {
    ...this.lineStyle,
  };

  timeLine: React.CSSProperties = {
    ...this.lineStyle,
    paddingTop: "5px",
  };

  dateLine: React.CSSProperties = {
    ...this.lineStyle,
    fontFamily: "var(--body-font)",
    fontSize: "1.2rem",
  };

  leftStyle: React.CSSProperties = {
    textAlign: "start",
  };

  rightStyle: React.CSSProperties = {
    textAlign: "end",
  };

  render() {
    return (
      <>
        {this.props.show ? (
          <div style={this.componentStyle}>
            <ul style={this.listStyle}>
              <li style={this.nameLine}>
                <p>{this.name}</p>
              </li>
              <li style={this.locationLine}>
                <p style={this.leftStyle}>{this.location}</p>
              </li>
              <li style={this.timeLine}>
                <p style={this.rightStyle}>{this.time}</p>
              </li>
              <li style={this.dateLine}>
                <p style={this.rightStyle}>{this.date}</p>
              </li>
            </ul>
          </div>
        ) : null}
      </>
    );
  }
}

export default ShowRow;
