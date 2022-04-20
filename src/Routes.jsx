import React from "react";
import { Routes as RoutesContainer, Route } from "react-router-dom";
import App from "./App";
import Signup from "./Pages/Auth/Signup/Signup";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/LandingPage/Landing";
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import Archive from "./Pages/Archive/Archive";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Label from "./Pages/Label/Label";
import Profile from "./Pages/Profile/Profile";
const Routes = () => {
  return (
    <RoutesContainer>
      <Route path="/landing" element={<Landing />} />
      <Route path="/" element={<App />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="/archives" element={<Archive />} />
          <Route path="/labels" element={<Label />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>
    </RoutesContainer>
  );
};

export default Routes;
