// Entrypoint of the javascript application

import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import App from "./app/App";
// @ts-ignore
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
