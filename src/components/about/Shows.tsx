import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Show } from "../../types/show";
import styles from "./styles/Shows.module.css";

class Shows extends Component {
  state: { upcomingShows: Show[]; pastShows: Show[] } = {
    upcomingShows: [],
    pastShows: [],
  };

  showsUrl = "http://localhost:3000/api/about/shows";

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
    return str.replace("0", "O");
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
                <p className={styles.date}>{this.convertZeros(date)}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.column}>
          <h5>Upcoming Shows</h5>
          {this.showsList(this.state.upcomingShows)}
        </div>
        <div className={styles.columnAlt}>
          <h5>Past Shows</h5>
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
