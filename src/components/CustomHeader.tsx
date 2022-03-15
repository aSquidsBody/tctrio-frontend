import React, { Component } from "react";

import styles from "./styles/CustomHeader.module.css";

class CustomHeader extends Component<
  { value: string; color?: string; margin?: number },
  {}
> {
  color = () => {
    if (this.props.color) return { color: this.props.color };
    return {};
  };
  background = () => {
    if (this.props.color) return { background: this.props.color };
    return {};
  };

  margin = () => {
    if (this.props.margin)
      return `${this.props.margin}px 0px ${this.props.margin - 20}px 0px`;
    else return `70px 0px 50px 0px`;
  };
  render() {
    return (
      <div
        className={styles.component}
        style={{
          margin: this.margin(),
        }}
      >
        <div className={styles.col}>
          <h3 className={styles.title} style={this.color()}>
            {this.props.value}
          </h3>
          <div className={styles.bar} style={this.background()} />
        </div>
      </div>
    );
  }
}

export default CustomHeader;
