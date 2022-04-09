import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { makeServer } from "./server";
import Routes from "./Routes"
import {BrowserRouter} from "react-router-dom"
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
