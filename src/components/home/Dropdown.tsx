import { cp } from "fs/promises";
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
      height: this.state.hover ? "600px" : "0px",
      transition: this.state.hover
        ? "height 0.3s ease-in"
        : "all 0.01s ease-out",
      overflow: "hidden",
    };
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <div style={this.contentDiv}>
          <p
            style={this.labelStyle()}
            className="noSelect"
            onMouseEnter={this.onEnter}
            onMouseLeave={this.onLeave}
          >
            {this.label}
          </p>

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
