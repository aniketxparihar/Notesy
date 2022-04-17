import React from 'react'
import { Link,NavLink } from 'react-router-dom';
import "./Sidebar.css"
import { useTheme } from '../../Context/Theme-Context';
const Sidebar = () => {
  const { theme,themeObject, themeHandler } = useTheme();
  return (
    <div
      className="sidebar__wrapper"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="sidebar__links">
        <NavLink
          to="/"
          className="sidebar__link"
          style={({ isActive }) => {
            return {
              color: themeObject.text,
              backgroundColor: isActive ? "var(--cta)" : "",
            };
          }}
        >
          <i className="sidebar__link--icon material-icons ">home</i>
          <div className="sidebar__link--text">Home</div>
        </NavLink>
        <NavLink
          to="/labels"
          className="sidebar__link"
          style={({ isActive }) => {
            return {
              color: themeObject.text,
              backgroundColor: isActive ? "var(--cta)" : "",
            };
          }}
        >
          <i className="sidebar__link--icon material-icons ">label</i>
          <div className="sidebar__link--text">Labels</div>
        </NavLink>
        <NavLink
          to="/archive"
          className="sidebar__link"
          style={({ isActive }) => {
            return {
              color: themeObject.text,
              backgroundColor: isActive ? "var(--cta)" : "",
            };
          }}
        >
          <i className="sidebar__link--icon material-icons ">archive</i>
          <div className="sidebar__link--text">Archive</div>
        </NavLink>
        <NavLink
          to="/trash"
          className="sidebar__link"
          style={({ isActive }) => {
            return {
              color: themeObject.text,
              backgroundColor: isActive ? "var(--cta)" : "",
            };
          }}
        >
          <i className="sidebar__link--icon material-icons ">delete</i>
          <div className="sidebar__link--text">Trash</div>
        </NavLink>
        <NavLink
          to="/profile"
          className="sidebar__link"
          style={({ isActive }) => {
            return {
              color: themeObject.text,
              backgroundColor: isActive ? "var(--cta)" : "",
            };
          }}
        >
          <i className="sidebar__link--icon material-icons ">account_circle</i>
          <div className="sidebar__link--text">Profile</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar