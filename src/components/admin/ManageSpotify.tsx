import axios from "axios";
import classNames from "classnames";
import React, { Component } from "react";
import {
  MUSIC_HIGHLIGHTS_URL,
  SPOTIFY_PLAYLISTS_URL,
  HIGHLIGHT_SONGS,
} from "../../config";
import { authRequest } from "../../pages/Admin/AuthRoute";
import TextInput from "./common/TextInput";
import sharedStyles from "./styles/Manage.module.css";
import styles from "./styles/ManageSpotify.module.css";

interface Playlist {
  name: string;
  id: string;
}

class ManageSpotify extends Component<
  { setAuth: (auth: boolean) => void },
  {}
> {
  state = {
    id: "",

    highlights: {
      name: HIGHLIGHT_SONGS,
      id: "",
    },

    errText: "",
  };

  // Fetch playlists
  fetchData = async () => {
    try {
      const res = await authRequest(() =>
        axios.get<{ playlists: Playlist[] }>(SPOTIFY_PLAYLISTS_URL, {
          withCredentials: true,
        })
      );
      if (!res) return this.props.setAuth(false);
      if (res.data.playlists.length === 0) {
        console.error("Could not find playlist");
      }
      this.setState({ highlights: res.data.playlists[0] });
    } catch (err) {}
  };

  componentDidMount() {
    this.fetchData();
  }

  updatePlaylist = async () => {
    if (!this.state.id) {
      this.setState({ errText: "Invalid id/url" });
    }
    try {
      let body: { newId?: string; newUrl?: string; oldName: string } = {
        oldName: HIGHLIGHT_SONGS,
      };
      if (/.*spotify.com.*/.test(this.state.id)) body.newUrl = this.state.id;
      else body.newId = this.state.id;
      const res: { data: { playlists: [{ id: string; name: string }] } } =
        await authRequest(() =>
          axios.put(SPOTIFY_PLAYLISTS_URL, body, {
            withCredentials: true,
          })
        );
      if (!res) return this.props.setAuth(false);

      this.setState({
        id: "",
        highlights: res.data.playlists[0],
      });
    } catch (err: any) {
      if (err.response) {
        console.error(err.response!.data);
      } else {
        console.error(err.message);
      }
    }
  };

  deletePlaylist = async (name: string) => {
    try {
      const res = await authRequest(() =>
        axios.delete(MUSIC_HIGHLIGHTS_URL + "/" + name, {
          withCredentials: true,
        })
      );
      if (!res) return this.props.setAuth(false);

      this.state.highlights.name = "";
      this.setState({});
    } catch (err: any) {
      if (err.response?.data) {
        console.error(err.response!.data);
      } else {
        console.error(err.message);
      }
    }
  };

  onKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await this.updatePlaylist();
    }
  };

  playlistRow = () => {
    return (
      <div className={styles.row}>
        <div className={classNames(styles.rowElem, styles.title)}>
          Front-page
        </div>
        <div className={classNames(styles.rowElem, styles.id)}>
          {this.state.highlights.id}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className={sharedStyles.component}>
        <div className={sharedStyles.padding}>
          <div className={styles.col}>
            <div className={styles.inputSection}>
              <div
                className={styles.textWrapper}
                style={{
                  marginBottom: "10px",
                }}
              >
                <TextInput
                  name={"Spotify Playlist ID/URL"}
                  value={this.state.id}
                  onChange={(e) => this.setState({ id: e.target.value })}
                  onKeyPress={this.onKeyPress}
                ></TextInput>
              </div>

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
            <div>
              <div className={styles.headerRow}>
                <div className={styles.header}>Name</div>
                <div className={styles.header}>ID</div>
              </div>
              {this.playlistRow()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageSpotify;
