import axios from "axios";
import React, { Component } from "react";
import { SHOWS_URL } from "../../../config";
import AddShow from "./AddShow";
import ListShows from "./ListShows";
import sharedStyles from "../styles/Manage.module.css";
import styles from "./styles/ManageShows.module.css";

interface Show {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
}

interface AddShowType {
  name?: string;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
}

class ManageShows extends Component {
  state = {
    errText: "",
    fetchError: null,
    shows: [] as Show[],
  };

  fetchData = async () => {
    try {
      const res = await axios.get<{
        upcomingShows: Show[];
        pastShows: Show[];
      }>(SHOWS_URL);
      const { upcomingShows, pastShows } = res.data;
      this.state.shows.push(...upcomingShows, ...pastShows);
      this.setState({});
    } catch (err: any) {
      this.setState({ fetchError: err });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  addShow = async (show: AddShowType) => {
    try {
      const res = await axios.post<{ shows: Show[] }>(SHOWS_URL, show, {
        withCredentials: true,
      });
      if (!(res.data?.shows?.length >= 1)) return;
      const added = res.data.shows[0];
      this.state.shows.push(added);
      this.setState({});
    } catch (err: any) {}
  };

  deleteShow = async (id: number) => {
    try {
      await axios.delete(SHOWS_URL + `/${id}`, {
        withCredentials: true,
      });
    } catch (err: any) {}
    const shows = this.state.shows.filter((show) => show.id !== id);
    this.setState({ shows });
  };

  render() {
    return (
      <div className={sharedStyles.component}>
        <div className={sharedStyles.padding}>
          <div className={styles.row}>
            <div className={styles.leftCol}>
              <AddShow addShow={this.addShow} />
            </div>
            <div className={styles.rightCol}>
              <ListShows
                shows={this.state.shows}
                deleteShow={this.deleteShow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageShows;
