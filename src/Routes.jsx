import React from 'react'
import { Routes as RoutesContainer,Route } from "react-router-dom";
import App from "./App"
import Home from './Pages/Home/Home';
import Landing from './Pages/LandingPage/Landing';
const Routes = () => {
  return (
    <RoutesContainer>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </RoutesContainer>
  );
}

export default Routes