import React, { Component } from "react";
import { Redirect } from "react-router";
import ManageBio from "../../../components/admin/ManageBio";
import ManageSpotify from "../../../components/admin/ManageSpotify";
import ManageUser from "../../../components/admin/ManageUser";
import ManageYoutube from "../../../components/admin/ManageYoutube";
import ManageShows from "../../../components/admin/shows/ManageShows";
import { SpotifyToken } from "../../../types/spotify";
import { setLogin } from "../../../utils/auth";
import Body from "../../Body";
import AuthRoute from "../AuthRoute";
import styles from "./styles/AdminHome.module.css";

class AdminHome extends Component {
  state = {
    auth: true,
    selected: null,
    menus: [
      {
        name: "User Settings",
        selected: false,
        hover: false,
        mouseDown: false,
      },
      {
        name: "Spotify",
        selected: false,
        hover: false,
        mouseDown: false,
      },
      {
        name: "Youtube",
        selected: false,
        hover: false,
        mouseDown: false,
      },
      {
        name: "Shows",
        selected: false,
        hover: false,
        mouseDown: false,
      },
      {
        name: "Bio",
        selected: false,
        hover: false,
        mouseDown: false,
      },
    ],
    opened: <></>,
  };

  downSelect = (name: string) => (e: React.MouseEvent) => {
    const items = this.state.menus;
    items.forEach((item) => {
      if (item.name === name) {
        item.selected = true;
        item.mouseDown = true;
      } else {
        item.selected = false;
        item.mouseDown = false;
      }
    });
    let opened: JSX.Element;
    if (name === "User Settings")
      opened = <ManageUser setAuth={this.setAuth} />;
    else if (name === "Bio") opened = <ManageBio setAuth={this.setAuth} />;
    else if (name === "Shows") opened = <ManageShows setAuth={this.setAuth} />;
    else if (name === "Youtube")
      opened = <ManageYoutube setAuth={this.setAuth}></ManageYoutube>;
    else if (name === "Spotify")
      opened = <ManageSpotify setAuth={this.setAuth}></ManageSpotify>;
    else opened = <div></div>;
    this.setState({ opened });
  };

  upSelect = (name: string) => () => {
    const items = this.state.menus;
    items.forEach((item) => {
      if (item.name === name) item.mouseDown = false;
    });
    this.setState({});
  };

  toggleHover = (name: string) => () => {
    const items = this.state.menus;
    items.forEach((item) => {
      if (item.name === name) item.hover = !item.hover;
      if (item.mouseDown) item.mouseDown = false;
    });
    this.setState({});
  };

  setAuth = (auth: boolean) => {
    setLogin(auth);

    this.setState({ auth });
  };

  render() {
    if (!this.state.auth) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <AuthRoute>
        <Body page="">
          <div className={styles.component}>
            <div className={styles.redBar}></div>
            <div className="container">
              <div className={styles.grid}>
                <div className={styles.leftCol}>
                  <div className={styles.menu}>
                    {this.state.menus.map(
                      ({ name, selected, hover, mouseDown }) => {
                        return (
                          <div key={name} className={styles.selection}>
                            <input
                              style={{
                                color: selected
                                  ? mouseDown
                                    ? "#66ffff"
                                    : "#44dddd"
                                  : "black",
                                cursor: hover ? "pointer" : "default",
                                transition: "all .05s ease",
                                WebkitTransition: "all .05s ease",
                                MozTransition: "all .05s ease",
                              }}
                              type="button"
                              value={name}
                              onMouseLeave={this.toggleHover(name)}
                              onMouseEnter={this.toggleHover(name)}
                              onMouseDown={this.downSelect(name)}
                              onMouseUp={this.upSelect(name)}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "0px",
                                height: "100%",
                                width: "100%",
                                background: hover
                                  ? mouseDown
                                    ? "#bfbfbf"
                                    : "#bbb"
                                  : "none",
                                zIndex: -1,
                                transition: "all .05s ease",
                                WebkitTransition: "all .05s ease",
                                MozTransition: "all .05s ease",
                                borderRadius: "5px",
                              }}
                            ></div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className={styles.rightCol}>
                  <div className={styles.rightBox}>{this.state.opened}</div>
                </div>
              </div>
            </div>
          </div>
        </Body>
      </AuthRoute>
    );
  }
}

export default AdminHome;
