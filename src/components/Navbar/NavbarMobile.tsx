import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Mobile, Desktop } from "../other/Responsive";
import classNames from "classnames";

import blackSig from "../../assets/sig_black.png";
import whiteSig from "../../assets/sig_white.png";

import styles from "./styles/NavbarMobile.module.css";

class NavbarMobile extends Component<
  {
    links: { endpoint: string; name: string }[];
  },
  {}
> {
  render() {
    return (
      <div className={styles.component}>
        <input type="checkbox" className={styles.toggler} />
        <img
          src={whiteSig}
          alt="Tyler's Signature"
          className={styles.signature}
        />
        <div className={styles.hamburger}>
          <div className={styles.lines}></div>
        </div>
        <div className={styles.overlay}>
          <div className={styles.circle}>
            <img
              src={whiteSig}
              alt="Tyler's Signature"
              className={styles.signature}
            />
            <div className={classNames(styles.mobileSpace, "space")}>
              &nbsp;
            </div>
            <ul className={styles.menuLinks}>
              {this.props.links.map(
                (
                  { endpoint, name }: { endpoint: string; name: string },
                  idx
                ) => {
                  return (
                    <li key={endpoint}>
                      <div className={styles.listItem}>
                        <Link to={endpoint} className={styles.link}>
                          {name.toUpperCase()}
                        </Link>
                      </div>
                      {idx !== this.props.links.length - 1 ? (
                        <div className={styles.whiteLine}></div>
                      ) : null}
                    </li>
                  );
                }
              )}
            </ul>
            <div className={classNames(styles.mobileSpace, "space")}>
              &nbsp;
            </div>
            <div className={classNames(styles.mobileSpace, "space")}>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarMobile;
