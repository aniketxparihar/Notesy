import React, { useEffect, useState } from 'react';
import "./Trash.css";
import { useTheme } from "../../Context/Theme-Context";
import { useNotes } from '../../Context/Notes-Context';
import DeletedNoteCard from '../../Components/DeletedNoteCard/DeletedNoteCard';
const Trash = () => {
    const { themeObject } = useTheme();
    const { trashedNotes,getTrashNoteHandler } = useNotes();
    useEffect(() => {
        getTrashNoteHandler();
    },[])
  return (
    <div
      className="archive__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="archive__notes__container">
        <div className="archive__heading" style={{ color: themeObject.text }}>
          Trashed Notes
        </div>
        <div className="archive__notes">
          {trashedNotes.map((note) => {
            return <DeletedNoteCard key={note._id} data={note} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Trash