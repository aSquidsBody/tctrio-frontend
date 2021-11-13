import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Mobile, Desktop } from "../other/Responsive";
import classNames from "classnames";

import blackSig from "../../assets/sig_black.png";
import whiteSig from "../../assets/sig_white.png";

import styles from "./styles/NavbarDesktop.module.css";

class NavbarDesktop extends Component<
  {
    links: { endpoint: string; name: string }[];
  },
  {}
> {
  render() {
    return (
      <div className={styles.component}>
        <div className={classNames(styles.menu, "container")}>
          <img
            src={whiteSig}
            alt="Tyler's Signature"
            className={styles.signature}
          />
          <ul>
            {this.props.links.map(
              ({ endpoint, name }: { endpoint: string; name: string }, idx) => {
                return (
                  <li key={endpoint} className={styles.listItem}>
                    <Link to={endpoint} className={styles.link}>
                      {name.toUpperCase()}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavbarDesktop;
