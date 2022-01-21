// The app declaration
import React, { Component } from "react";

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
import AdminHome from "../pages/Admin/Home/AdminHome";
import Login from "../pages/Admin/Login/Login";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/music">
          <Music />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/admin">
          <AdminHome />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    );
  }
}

export default App;
