import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BACKGROUND_GREY_GRADIENT } from "../../config";
import { Show } from "../../types/show";

import ScrollBox from "../other/Scrollbox";
import ShowRow from "./ShowRow";

const SHOWS_PAGE = "/about";

interface ShowsCardProps {
  shows: Show[];
  style?: React.CSSProperties;
}

class ShowsCard extends Component<ShowsCardProps, {}> {
  componentStyle: React.CSSProperties;
  constructor(props: ShowsCardProps) {
    super(props);

    this.componentStyle = {
      ...props.style,
    };

    this.componentStyle.background = BACKGROUND_GREY_GRADIENT;
    this.componentStyle.fontFamily = "var(--alternate-font)";
    this.componentStyle.color = "white";
  }

  scrollBox: React.CSSProperties = {
    maxHeight: "430px",
    width: "100%",
  };

  dividerBox: React.CSSProperties = {
    height: "2px",
    width: "100%",
    marginBottom: "5px",
    display: "flex",
    justifyContent: "center",
  };

  divider: React.CSSProperties = {
    background: "#505050",
    height: "100%",
    width: "95%",
  };

  seeMoreLink: React.CSSProperties = {
    width: "100%",
    marginTop: "10px",
    height: "2rem",
    color: "var(--selected-color)",
    textAlign: "center",
  };

  render() {
    return (
      <div style={this.componentStyle}>
        {this.props.shows.length > 0 ? (
          <ScrollBox style={this.scrollBox}>
            {this.props.shows.map((show, idx) => {
              return (
                <div key={show.name + idx.toString()}>
                  <ShowRow show={show}></ShowRow>
                  {idx !== this.props.shows.length - 1 ? (
                    <div style={this.dividerBox}>
                      <div style={this.divider}></div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </ScrollBox>
        ) : null}
        <div style={this.dividerBox}>
          <div style={this.divider}></div>
        </div>
        <div style={this.seeMoreLink}>
          <Link to={SHOWS_PAGE}>See all shows</Link>
        </div>
      </div>
    );
  }
}

export default ShowsCard;
