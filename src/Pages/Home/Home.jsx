import React from 'react'
import "./Home.css"
import { useTheme } from '../../Context/Theme-Context';
import NoteCard from '../../Components/NoteCard/NoteCard.jsx'
import NewNoteCard from "../../Components/NewNoteCard/NewNoteCard.jsx";
import { useNotes } from '../../Context/Notes-Context';
import Filter from '../../Components/Filter/Filter';
const Home = () => {
  const { themeObject } = useTheme();
  const { notes, filteredNotes,prioritySort,dateSort,searchSort,tagSort } = useNotes();
  return (
    <div
      className="home__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="home__notes__container">
        <div className="home__add-new-note">
          <Filter />
          <NewNoteCard />
        </div>
        <div className="home__notes--pinned">
          <div
            className="notes-category-heading"
            style={{
              display:
                filteredNotes.length > 0
                  ? filteredNotes.filter((note) => note.pinned === true)
                      .length > 0
                    ? "block"
                    : "none"
                  : notes.filter((note) => note.pinned === true).length > 0
                  ? "block"
                  : "none",
              color: themeObject.text,
            }}
          >
            {(prioritySort !== "" && filteredNotes.length === 0) ||
            filteredNotes.some((note) => note.pinned === true) === false
              ? null
              : "Pinned Notes"}
          </div>
          <div className="notes__grid">
            {prioritySort !== "" || searchSort !== "" || tagSort !== ""
              ? filteredNotes.map((note) => {
                  if (note.pinned === true) return <NoteCard data={note} />;
                })
              : notes.length > 0
              ? notes.map((note) => {
                  if (note.pinned === true) return <NoteCard data={note} />;
                })
              : null}
            <div className="txt-4xl" style={{ color: themeObject.text }}>
              {prioritySort !== "" && filteredNotes.length === 0
                ? `0 Notes Found with ${prioritySort} `
                : null}
            </div>
          </div>
        </div>
        <div className="home__notes--unpinned">
          <div
            className="notes-category-heading"
            style={{
              display:
                notes.filter((note) => note.pinned === false).length > 0
                  ? "block"
                  : "none",
              color: themeObject.text,
            }}
          >
            {(prioritySort !== "" && filteredNotes.length === 0) ||
            filteredNotes.every((note) => note.pinned === true) === true
              ? null
              : "Unpinned Notes"}
          </div>
          <div className="notes__grid">
            {prioritySort !== "" || searchSort !== "" || tagSort !== ""
              ? filteredNotes.map((note) => {
                  if (note.pinned === false) return <NoteCard data={note} />;
                })
              : notes.length > 0
              ? notes.map((note) => {
                  if (note.pinned === false) return <NoteCard data={note} />;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home