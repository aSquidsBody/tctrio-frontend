import axios from "axios";
import React, { Component } from "react";
import { ABOUT_URL } from "../../config";

import sharedStyles from "./styles/Manage.module.css";
import styles from "./styles/ManageBio.module.css";

class ManageBio extends Component {
  state = {
    bio: "",
    updateBio: "",
    errText: "",
    successText: "",
  };
  fetchData = async () => {
    try {
      const res = await axios.get<{
        text: string;
      }>(ABOUT_URL);
      const bio = res.data.text;
      this.setState({
        bio,
        updateBio: bio,
      });
    } catch (err) {}
  };

  async componentDidMount() {
    await this.fetchData();
  }

  updateBio = async () => {
    if (this.state.bio === this.state.updateBio) {
      this.setState({ errText: "", successText: "" });
      return;
    }

    try {
      const res = await axios.put<{ text: string }>(
        ABOUT_URL,
        {
          text: this.state.updateBio,
        },
        {
          withCredentials: true,
        }
      );

      const updatedBio = res.data.text;

      this.setState({
        bio: updatedBio,
        errText: "",
        successText: "Bio Updated",
      });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach(({ field }: { field: string }) => {
          if (field === "text") {
            this.setState({
              errText: "Bio cannot be empty",
              successText: "",
            });
          }
        });
      } else {
      }
    }
  };

  handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await this.updateBio();
    } else {
      this.setState({ errText: "", successText: "" });
    }
  };

  render() {
    return (
      <div className={sharedStyles.component}>
        <div className={sharedStyles.padding}>
          <div className={sharedStyles.item}>
            <p className={sharedStyles.bold}>Bio</p>
            <div className={styles.updateBioWrapper}>
              <textarea
                name="bio"
                id="bio"
                className={styles.updateBio}
                value={this.state.updateBio}
                onChange={(e) => this.setState({ updateBio: e.target.value })}
                onKeyPress={this.handleKeyPress}
              ></textarea>
            </div>
          </div>
          <div className={sharedStyles.item}>
            <button className={sharedStyles.btn} onClick={this.updateBio}>
              Update Bio
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
            ) : this.state.successText ? (
              <p
                style={{
                  color: "#66ffff",
                  fontStyle: "italic",
                }}
              >
                {this.state.successText}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ManageBio;
