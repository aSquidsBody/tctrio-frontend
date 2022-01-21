import React, { Component } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import axios from "axios";

import { Show } from "../../types/show";
import { SHOWS_URL } from "../../config";
import styles from "./styles/Shows.module.css";
import { convertZeros, formatDate } from "../../utils/formatter";

class Shows extends Component {
  state: { upcomingShows: Show[]; pastShows: Show[] } = {
    upcomingShows: [],
    pastShows: [],
  };

  showsUrl = SHOWS_URL;

  fetchData = async () => {
    try {
      const res = await axios.get<{ upcomingShows: Show[]; pastShows: Show[] }>(
        this.showsUrl
      );
      this.setState({ ...res.data });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  convertZeros = (str: string) => {
    // Zeros look funny with body-font
    return convertZeros(str);
  };

  showsList = (showsList: Show[]) => {
    if (showsList) {
      return (
        <ul>
          {showsList.map(({ name, location, date }) => {
            return (
              <li key={name}>
                <p className={styles.title}>{name}</p>
                <p className={styles.location}>{location}</p>
                <p className={styles.date}>
                  {this.convertZeros(formatDate(date))}
                </p>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  render() {
    return (
      <div className={styles.component} id="shows">
        <div className={styles.column}>
          <h5 className={styles.barTitle}>Upcoming Shows</h5>
          {this.showsList(this.state.upcomingShows)}
        </div>
        <div className={styles.columnAlt}>
          <h5 className={styles.barTitle}>Past Shows</h5>
          {this.showsList(this.state.pastShows)}
          <div className={styles.centerCol}>
            <Link
              to={"/shows"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Show more
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Shows;
