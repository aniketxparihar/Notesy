import React, { useEffect, useState } from "react";
import "./Label.css";
import { useTheme } from "../../Context/Theme-Context";
import NoteCard from "../../Components/NoteCard/NoteCard";
import { useNotes } from "../../Context/Notes-Context";
const Label = () => {
  const { themeObject } = useTheme();
  const { labelNotes, notes, labelRender } = useNotes();
  const [uniqueLabelNotes, setUniqueLabelNotes] = useState([]);
  useEffect(() => {
    setUniqueLabelNotes(Array.from(new Set(labelNotes)));
  }, [labelNotes, labelRender]);
  return (
    <div
      className="label__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="label__notes__container">
        <div className="label__heading" style={{ color: themeObject.text }}>
          Labels
        </div>
        <div className="label__notes">
          {labelNotes.length === 0 ? (
            <h1 className="archive-empty" style={{ color: themeObject.text }}>
              Nothing here yet 🗒...
            </h1>
          ) : null}
          {uniqueLabelNotes.map((label) => {
            return (
              <div key={label.id} className="label-notes-wrapper">
                <div
                  className="label--type"
                  style={{
                    color: themeObject.text,
                    border: `1px solid ${themeObject.secondary}`,
                  }}
                >
                  {label}
                </div>
                {notes
                  .filter((note) => note.label.includes(label))
                  .map((note) => {
                    return <NoteCard key={note._id} data={note} />;
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Label;
