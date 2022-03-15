import React, { Component } from "react";
import styles from "./styles/Banner.module.css";

class Banner extends Component<{
  img: string;
  top?: string;
  left?: string;
  height?: string;
  width?: string;
}> {
  style = () => {
    let css: React.CSSProperties = {};
    if (this.props.top) css.top = this.props.top;
    if (this.props.left) css.left = this.props.left;
    if (this.props.height) css.height = this.props.height;
    css.width = "100%";
    css.minWidth = this.props.width;
    return css;
  };

  render() {
    return (
      <div className={styles.component}>
        <img src={this.props.img} alt="Banner" style={this.style()} />
      </div>
    );
  }
}

export default Banner;
