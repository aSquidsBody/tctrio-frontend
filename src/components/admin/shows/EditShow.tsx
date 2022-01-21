import axios from "axios";
import React, { Component } from "react";
import { SHOWS_URL } from "../../../config";
import TextInput from "../common/TextInput";
import sharedStyles from "../styles/Manage.module.css";
import styles from "./styles/AddShow.module.css";

interface Show {
  id: number;
  name: string;
  location: string;
  date: Date;
  time: string;
}

class AddShow extends Component {
  state = {
    newName: "",
    newDate: "",
    newLocation: "",
    newTime: "",
    newDescription: "",
    errText: "",
    shows: [] as Show[],
    fetchError: null,
  };

  addShow = async () => {
    try {
      const res = await axios.post<{ shows: Show[] }>(SHOWS_URL, {
        name: this.state.newName || undefined,
        date: this.state.newDate
          ? new Date(this.state.newDate).toISOString()
          : undefined,
        location: this.state.newLocation || undefined,
        time: this.state.newTime || undefined,
        description: this.state.newDescription || undefined,
      });

      if (res.data.shows.length <= 0) return;
      const added = res.data.shows[0];
      this.state.shows.push(added);
      this.setState({
        newName: "",
        newDate: "",
        newLocation: "",
        newTime: "",
        newDescription: "",
      });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        let errText = "Invalid fields: ";
        err.response.data.errors.forEach(({ field }: { field: string }) => {
          if (field) {
            errText += `"${field}" `;
          }
        });
        if (errText !== "Invalid fields: ") {
          this.setState({
            errText,
          });
        }
      }
    }
  };

  handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await this.addShow();
    } else {
      this.setState({ errText: "" });
    }
  };

  render() {
    return (
      <div className={styles.component}>
        <p className={styles.title}>New</p>
        <div className={sharedStyles.item}>
          <TextInput
            name="Name"
            value={this.state.newName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ newName: e.target.value });
            }}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className={sharedStyles.item}>
          <TextInput
            name="Date"
            value={this.state.newDate}
            optional={true}
            type="date"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ newDate: e.target.value });
            }}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className={sharedStyles.item}>
          <TextInput
            name="Time"
            value={this.state.newTime}
            optional={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ newTime: e.target.value });
            }}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className={sharedStyles.item}>
          <TextInput
            name="Location"
            value={this.state.newLocation}
            optional={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ newLocation: e.target.value });
            }}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className={sharedStyles.item}>
          <button className={sharedStyles.btn} onClick={this.addShow}>
            Create
          </button>
          {this.state.errText ? (
            <p
              style={{
                color: "darkred",
                fontStyle: "italic",
              }}
            >
              {this.state.errText}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddShow;
