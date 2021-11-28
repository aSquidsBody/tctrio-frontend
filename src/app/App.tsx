// The app declaration
import React, { Component } from "react";
import axios from "axios";

import "../assets/fonts/Claxton-Bold.otf";
import "../assets/fonts/Claxton-Light.otf";
import "../assets/fonts/Claxton.otf";
// @ts-ignore
import { Switch, Route } from "react-router-dom";
import "../styles/App.css";

import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Music from "../pages/Music/Music";
import { SpotifyToken, SpotifyTokenResp } from "../types/spotify";
import { TOKEN_URL } from "../config";

class App extends Component {
  state = {
    spotifyToken: { accessToken: "", expires: new Date(0) } as SpotifyToken,
  };

  fetchData = async () => {
    let { accessToken, expires } = this.getLocalToken();
    expires = expires ? expires : this.state.spotifyToken.expires;

    if (expires < new Date(Date.now())) {
      try {
        try {
          const res = await axios.get<SpotifyTokenResp>(TOKEN_URL);

          // store the token in localStorage
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("expires", res.data.expires);

          this.setState({
            spotifyToken: {
              accessToken: res.data.accessToken,
              expires: res.data.expires,
            },
          });
        } catch (err) {
          // err
        }
      } catch (err) {
        // err
      }
    } else {
      this.setState({ spotifyToken: { accessToken, expires } });
    }
  };

  getLocalToken: () => SpotifyToken = () => {
    // Read token from local storage
    const accessToken = localStorage.getItem("token") || "";
    const expires = new Date(localStorage.getItem("expires") || 0);
    return { accessToken, expires };
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home spotifyToken={this.state.spotifyToken} />
        </Route>
        <Route path="/music">
          <Music spotifyToken={this.state.spotifyToken} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    );
  }
}

export default App;
