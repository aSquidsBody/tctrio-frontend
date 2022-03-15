import React, { Component } from "react";

interface DropdownProps {
  label: string;
  style?: React.CSSProperties;
}

class Dropdown extends Component<DropdownProps, {}> {
  componentStyle: React.CSSProperties;
  label: string;
  state: { hover: boolean };

  constructor(props: DropdownProps) {
    super(props);
    this.componentStyle = {
      ...props.style,
    };
    this.label = props.label;
    this.state = { hover: false };
  }

  onEnter = () => {
    this.setState({ hover: true });
  };

  onLeave = () => {
    this.setState({ hover: false });
  };

  contentDiv: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };

  labelStyle = (): React.CSSProperties => {
    return {
      padding: "10px 20px",
      fontFamily: this.state.hover ? "var(--body-font)" : "var(--header-font)",
      fontSize: this.state.hover ? "1.95rem" : "1.8rem",
      cursor: "default",
      color: this.state.hover ? "gold" : "white",
      textShadow: "4px 4px 30px black",
    };
  };

  dropdown = (): React.CSSProperties => {
    return {
      height: this.state.hover ? "100%" : "0px",
      transition: this.state.hover
        ? "height 0.3s ease-in"
        : "all 0.01s ease-out",
      overflow: "hidden",
    };
  };

  arrowBox = (): React.CSSProperties => ({
    position: "relative",
    width: "30px",
    height: "20px",
    // background: "red",
    margin: "auto",
  });

  leftArrow = (n: number): React.CSSProperties => ({
    position: "absolute",
    top: `calc(50% + ${n}px)`,
    left: "3px",

    height: this.state.hover ? "1px" : "2px",
    width: `calc(${Math.sqrt(3) / 2} * 50%)`,
    background: this.state.hover ? "gold" : "white",
    boxShadow: "0px 1px 5px 0px black",
    transform: "rotate(30deg)",
  });

  rightArrow = (n: number): React.CSSProperties => ({
    position: "absolute",
    top: `calc(50% + ${n}px)`,
    right: "3px",

    height: this.state.hover ? "1px" : "2px",
    width: `calc(${Math.sqrt(3) / 2} * 50%)`,
    background: this.state.hover ? "gold" : "white",
    boxShadow: "0px 1px 5px 0px black",
    transform: "rotate(-30deg)",
  });

  render() {
    return (
      <div style={this.componentStyle}>
        <div style={this.contentDiv}>
          <div
            style={this.labelStyle()}
            className="noSelect"
            onMouseEnter={this.onEnter}
            onMouseLeave={this.onLeave}
          >
            {this.label}
            <div style={this.arrowBox()}>
              <div style={this.leftArrow(0)} />
              <div style={this.rightArrow(0)} />
              <div style={this.leftArrow(7)} />
              <div style={this.rightArrow(7)} />
            </div>
          </div>
          <div
            style={this.dropdown()}
            onMouseEnter={this.onEnter}
            onMouseLeave={this.onLeave}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
