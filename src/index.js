import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { makeServer } from "./server";
import Routes from "./Routes"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./Context/Theme-Context";
import { AuthProvider } from "./Context/Auth-Context";
import { NotesProvider } from "./Context/Notes-Context";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotesProvider>
            <Routes />
          </NotesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
