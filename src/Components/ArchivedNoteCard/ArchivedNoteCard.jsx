import React, { useEffect, useState } from "react";
import "./ArchivedNoteCard.css";
import { useTheme } from "../../Context/Theme-Context";
import { useNotes } from "../../Context/Notes-Context";

const ArchivedNoteCard = ({ data }) => {
  const { themeObject } = useTheme();
  const { archiveNoteRestoreHandler,archiveNoteDeleteHandler } = useNotes();
  return (
    <div
      className="note-card__container relative"
      style={{
        backgroundColor: data.color !== "" ? data.color : themeObject.secondary,
      }}
    >
      <div
        className="note-card__title"
        style={{
          color: themeObject.text,
        }}
      >
        {data.title}
      </div>

      <div
        className="note-card__body"
        style={{
          color: themeObject.text,
        }}
      >
        {data.body}
      </div>

      <div className="note-card__metadata" style={{ color: themeObject.text }}>
        <div className="note-card__metadata--timestamp ">
          Created on {data.date.slice(0, 9)}
        </div>

        <div
          className="note-card__metadata--archive material-icons"
          onClick={() => archiveNoteRestoreHandler(data._id)}
        >
          restore
        </div>

        <div
          className="note-card__metadata--delete material-icons"
          onClick={() => archiveNoteDeleteHandler(data._id)}
        >
          delete
        </div>
      </div>
    </div>
  );
};

export default ArchivedNoteCard;
