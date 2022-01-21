import React, { Component } from "react";

export interface IconProps {
  src: string;
  href: string;
  style?: React.CSSProperties;
}

class IconBase extends Component<IconProps, {}> {
  componentStyle: React.CSSProperties;
  src: string;
  href: string;
  state: {
    hover: boolean;
  };

  constructor(props: IconProps) {
    super(props);
    this.componentStyle = {
      ...this.props.style,
    };
    this.src = this.props.src || "";
    this.href = this.props.href || "";
    this.state = {
      hover: false,
    };
  }

  iconWrapper: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
  };

  linkStyle: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    zIndex: 1,
  };

  iconStyle = (): React.CSSProperties => {
    return {
      ...this.linkStyle,
      zIndex: 0,
      opacity: this.state.hover ? 0.8 : 1,
      transition: this.state.hover ? "opacity 0.05s" : "opacity 0.02s",
    };
  };

  render() {
    return (
      <div style={this.componentStyle}>
        <div style={this.iconWrapper}>
          <a
            href={this.href}
            target="_blank"
            rel="noreferrer"
            style={this.linkStyle}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
          ></a>
          <img src={this.src} alt="Facebook Logo" style={this.iconStyle()} />
        </div>
      </div>
    );
  }
}

export default IconBase;
