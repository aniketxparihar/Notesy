import React, { useEffect, useState } from "react";
import "./Trash.css";
import { useTheme } from "../../Context/Theme-Context";
import { useNotes } from "../../Context/Notes-Context";
import DeletedNoteCard from "../../Components/DeletedNoteCard/DeletedNoteCard";
const Trash = () => {
  const { themeObject } = useTheme();
  const { trashedNotes, getTrashNoteHandler } = useNotes();
  useEffect(() => {
    getTrashNoteHandler();
  }, []);
  return (
    <div
      className="trash__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="trash__notes__container">
        <div className="trash__heading" style={{ color: themeObject.text }}>
          Trashed Notes
        </div>
        <div className="trash__notes">
          {trashedNotes.length === 0 ? (
            <h1 className="archive-empty" style={{ color: themeObject.text }}>
              Nothing here yet 🗒...
            </h1>
          ) : null}
          {trashedNotes.map((note) => {
            return <DeletedNoteCard key={note._id} data={note} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Trash;
