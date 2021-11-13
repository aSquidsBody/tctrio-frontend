import { Component } from "react";

import styles from "./styles/CustomHeader.module.css";

class CustomHeader extends Component<{ value: string; color?: string }, {}> {
  color = () => {
    if (this.props.color) return { color: this.props.color };
    return {};
  };
  background = () => {
    if (this.props.color) return { background: this.props.color };
    return {};
  };
  render() {
    return (
      <div className={styles.component}>
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
