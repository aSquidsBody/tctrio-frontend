import classNames from "classnames";
import React, { Component } from "react";
import { formatDate } from "../../../utils/formatter";
import styles from "./styles/ListShows.module.css";

interface Show {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
}

interface ListShowsProps {
  shows: Show[];
  deleteShow: (id: number) => Promise<void>;
}

class ListShows extends Component<ListShowsProps, {}> {
  state = {
    hover: -1,
    authorized: true,
  };

  deleteShow = async (id: number) => {
    try {
      await this.props.deleteShow(id);
      this.setState({ hover: -1 });
    } catch (err: any) {}
  };

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.showCol}>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.headerElem}>
                <p className={styles.bodyFont}>Name</p>
              </div>
              <div className={styles.headerElem}>
                <p className={styles.bodyFont}>Date</p>
              </div>
              <div className={styles.headerElem}>
                <p className={styles.bodyFont}>Time</p>
              </div>
              <div className={styles.headerElem}>
                <p className={styles.bodyFont}>Location</p>
              </div>
            </div>
            {this.props.shows.map((s, idx) => {
              return (
                <div
                  key={s.name.replaceAll(" ", "_") + idx.toString()}
                  className={classNames(styles.showItem, styles.tableRow)}
                  onMouseEnter={() => {
                    this.setState({ hover: idx });
                  }}
                  onMouseLeave={() => {
                    this.setState({ hover: -1 });
                  }}
                  onClick={() => {
                    this.deleteShow(s.id);
                  }}
                  style={{
                    cursor: this.state.hover === idx ? "pointer" : "default",
                    boxShadow:
                      this.state.hover === idx
                        ? "1px 2px 1px 0px black"
                        : "none",
                    transition: "all .02s ease",
                    WebkitTransition: "all .02s ease",
                    MozTransition: "all .02s ease",
                    transform:
                      this.state.hover === idx
                        ? "translateX(3px) translateY(3px) scale(1.05)"
                        : "none",
                    background:
                      this.state.hover === idx
                        ? "rgb(218, 31, 31)"
                        : "linear-gradient(0.85turn, #252c39, #3c485e)",
                  }}
                >
                  <div className={styles.tableCol}>
                    <p className={styles.altFont}>{s.name}</p>
                  </div>
                  <div className={styles.tableCol}>
                    <p className={styles.altFont}>{formatDate(s.date)}</p>
                  </div>
                  <div className={styles.tableCol}>
                    <p className={styles.altFont}>{s.time || "TBA"}</p>
                  </div>
                  <div className={styles.tableCol}>
                    <p className={styles.altFont}>{s.location || "TBA"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ListShows;
