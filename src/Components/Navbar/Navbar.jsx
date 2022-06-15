import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { useTheme } from '../../Context/Theme-Context';
import { useNotes } from '../../Context/Notes-Context';
const Navbar = () => {
  const { theme, themeHandler, themeObject } = useTheme();
  const { setNoteFormVisible } = useNotes();
  const navigate = useNavigate();
  return (
    <nav>
      <div
        style={{
          backgroundColor: themeObject.primary,
        }}
        className="nav__wrapper fixed  b-1 border-gray-200 border-solid"
      >
        <div className="nav__left">
          <Link to="/landing" className="nav__logo">
            Notesy
          </Link>
        </div>
        <div className="nav__right">
          <div
            className="add-new-note button p-4 txt-2xl txt-bold bg-violet-500 rounded-m flex justify-center"
            onClick={() => { setNoteFormVisible("flex"); navigate("/")}}
          >
           New Note
          </div>
          <i
            className=" material-icons theme__icon pointer"
            style={{
              color: themeObject.text,
              border: `1px solid ${themeObject.text}`,
            }}
            onClick={() =>
              theme === "light" ? themeHandler("dark") : themeHandler("light")
            }
          >
            {theme === "light" ? "light_mode" : "dark_mode"}
          </i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar