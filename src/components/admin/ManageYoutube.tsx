import React, { Component } from "react";
import axios from "axios";

import {
  MAIN_VIDEOS,
  HIGHLIGHT_VIDEOS,
  YOUTUBE_PLAYLISTS_URL,
} from "../../config";
import TextInput from "./common/TextInput";

import sharedStyles from "./styles/Manage.module.css";
import styles from "./styles/ManageYoutube.module.css";

interface Playlist {
  id: string;
  name: string;
}

class ManageYoutube extends Component {
  state = {
    main: {
      id: "",
      name: MAIN_VIDEOS,
    },
    highlights: {
      id: "",
      name: HIGHLIGHT_VIDEOS,
    },
    id: "",
    name: "",
    hover: "",
    errText: "",
  };

  fetchData = async () => {
    try {
      const res = await axios.get<{ playlists: Playlist[] }>(
        YOUTUBE_PLAYLISTS_URL,
        {
          withCredentials: true,
        }
      );

      const main = res.data.playlists.filter(
        (playlist: Playlist) => playlist.name === MAIN_VIDEOS
      );
      const highlights = res.data.playlists.filter(
        (playlist: Playlist) => playlist.name === HIGHLIGHT_VIDEOS
      );
      if (main.length === 0 || highlights.length === 0) {
        console.error("Could not get playlists");
        return;
      }
      this.setState({ main: main[0], highlights: highlights[0] });
    } catch (err) {}
  };

  componentDidMount() {
    this.fetchData();
  }

  updatePlaylist = async () => {
    if (!this.state.name) {
      return;
    }

    if (!this.state.id) {
      this.setState({ errText: "Invalid id/url" });
      return;
    }
    try {
      let body: { newId?: string; newUrl?: string; oldName: string } = {
        oldName: this.state.name,
      };
      if (/.*youtube.com.*/.test(this.state.id)) body.newUrl = this.state.id;
      else body.newId = this.state.id;
      const res: { data: { playlists: [{ id: string; name: string }] } } =
        await axios.put(YOUTUBE_PLAYLISTS_URL, body, {
          withCredentials: true,
        });

      if (this.state.name === HIGHLIGHT_VIDEOS) {
        this.state.highlights.id = res.data.playlists[0].id;
        this.setState({ id: "", name: "" });
      }

      if (this.state.name === MAIN_VIDEOS) {
        this.state.main.id = res.data.playlists[0].id;
        this.setState({ id: "", name: "" });
      }
    } catch (err: any) {
      console.log(err.response!.data);
    }
  };

  onKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await this.updatePlaylist();
    }
  };

  selectable = (name: string): React.CSSProperties => {
    return {
      background: this.state.name === name ? "rgb(102, 255, 255, 0.65)" : "",
      opacity: this.state.hover === name && this.state.name !== name ? 0.5 : 1,
      color: this.state.name === name ? "black" : "white",
      boxShadow: this.state.name === name ? "2px 2px 20px 0px black" : "none",
      cursor: this.state.hover === name ? "pointer" : "default",
    };
  };

  render() {
    return (
      <div className={sharedStyles.component}>
        <div className={sharedStyles.padding}>
          <table className={styles.col}>
            <div className={styles.inputSection}>
              <div className={styles.item} style={{ width: "750px" }}>
                <TextInput
                  name={"Youtube Playlist ID/URL"}
                  value={this.state.id}
                  onChange={(e) => this.setState({ id: e.target.value })}
                  onKeyPress={this.onKeyPress}
                ></TextInput>
                <button
                  className={sharedStyles.btn}
                  onClick={this.updatePlaylist}
                >
                  Update
                </button>
                {this.state.errText ? (
                  <p style={{ color: "red", fontStyle: "italic" }}>
                    {this.state.errText}
                  </p>
                ) : null}
              </div>
            </div>
            <div className={styles.videoGrid}>
              <div className={styles.tableHeader}>
                <p className={styles.headerHighlight}>Name</p>
                <p className={styles.headerId}>ID</p>
              </div>
              <div className={styles.item}>
                <table
                  className={styles.row}
                  onClick={() => this.setState({ name: MAIN_VIDEOS })}
                  onMouseEnter={() => this.setState({ hover: MAIN_VIDEOS })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                  style={this.selectable(MAIN_VIDEOS)}
                >
                  <div className={styles.highlight}>Music-page</div>
                  <div className={styles.id}>
                    <p>{this.state.main.id}</p>
                  </div>
                </table>
              </div>
              <div className={styles.item}>
                <table
                  className={styles.row}
                  onClick={() => this.setState({ name: HIGHLIGHT_VIDEOS })}
                  onMouseEnter={() =>
                    this.setState({ hover: HIGHLIGHT_VIDEOS })
                  }
                  onMouseLeave={() => this.setState({ hover: "" })}
                  style={this.selectable(HIGHLIGHT_VIDEOS)}
                >
                  <div className={styles.highlight}>Front-page</div>
                  <div className={styles.id}>
                    <p>{this.state.highlights.id}</p>
                  </div>
                </table>
              </div>
            </div>
          </table>
        </div>
      </div>
    );
  }
}

export default ManageYoutube;
