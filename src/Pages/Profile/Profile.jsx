import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useTheme } from "../../Context/Theme-Context";
import { useAuth } from "../../Context/Auth-Context";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const { themeObject } = useTheme();
  const { user,tokenHandler,setToken } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    tokenHandler("");
    localStorage.removeItem("user");
    navigate('/login')
  }
  return (
    <div
      className="profile__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="profile__notes__container">
        <div className="profile__heading" style={{ color: themeObject.text }}>
          Hello , {user.firstName}
        </div>
        <button onClick={logoutHandler} className="button m-8 p-4 txt-2xl txt-bold bg-violet-500 rounded-m">
          Logout
        </button>
        
      </div>
    </div>
  );
};

export default Profile;
