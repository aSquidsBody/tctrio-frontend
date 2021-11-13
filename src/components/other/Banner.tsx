import { Component } from "react";
import styles from "./styles/Banner.module.css";

class Banner extends Component<{
  img: string;
  top?: string;
  left?: string;
  height?: string;
  width?: string;
}> {
  style = () => {
    let css: { [key: string]: string } = {};
    if (this.props.top) css.top = this.props.top;
    if (this.props.left) css.left = this.props.left;
    if (this.props.height) css.height = this.props.height;
    css.width = this.props.width ? this.props.width : "100%";
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
