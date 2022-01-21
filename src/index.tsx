// Entrypoint of the javascript application

import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import App from "./app/App";
// @ts-ignore
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.initialize("UA-216009723-1");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
