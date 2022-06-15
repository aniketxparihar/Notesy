import React, { useState } from "react";
import toast from "react-hot-toast";

import { useTheme } from "../../Context/Theme-Context";
import "./NewNoteCard.css";
import { useNotes } from "../../Context/Notes-Context";


const NewNoteCard = () => {
  const { themeObject } = useTheme();
  const [color, setColor] = useState("");
  const [palleteVisible, setPalleteVisible] = useState("none");
  const [title, setTitle] = useState("");
  const [body, setBody] =   useState("");
  const [label, setLabel] = useState("");
  const [priority, setPriority] = useState("");
  const [labelArray, setLabelArray] = useState([]);
  const [allFieldsRequired, setAllFieldsRequired] = useState("");
  const { addNoteHandler,noteFormVisible,setNoteFormVisible } = useNotes();
  const date = new Date();
  const addNewNoteHandler = async () => {
    try {
      setAllFieldsRequired("");
      await addNoteHandler({ title: title, body: body, label: labelArray.concat(label), priority: priority, pinned: false, color: color, date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/${date.getHours()}/${date.getMinutes()}/${date.getSeconds()}` })
      toast.success("New note added")
      discardNoteHandler();
    }
    catch (err) {
      console.log(err);
      }
    
    }
    const discardNoteHandler = () => {
      setTitle("");
      setBody("");
      setLabel("");
      setLabelArray([]);
      setPriority("");
      setColor("");
      setNoteFormVisible("none");
    }

  return (
    <>
      
      <div
        className="new-note-card__container relative"
        style={{ backgroundColor: color!==""?color:themeObject.secondary,display:noteFormVisible }}
      >
        <label
          className="label"
          htmlFor="new-note-card__title"
          style={{ color: themeObject.text }}
        >
          Title
        </label>
        <input
          id="new-note-card__title"
          className="new-note-card__title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          className="label"
          htmlFor="new-note-card__body"
          style={{ color: themeObject.text }}
        >
          Body
        </label>
        <textarea
          id="new-note-card__body"
          className="new-note-card__body"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label
          className="label"
          htmlFor="new-note-card__label"
          style={{ color: themeObject.text }}
        >
          Label
        </label>
        <input
          id="new-note-card__label"
          className="new-note-card__label"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <div
          className="new-note-card__metadata"
          style={{ color: themeObject.text }}
        >
          <div
            className="note-card__metadata--colour material-icons relative"
            onClick={() => setPalleteVisible("grid")}
            onMouseLeave={() => setPalleteVisible("none")}
          >
            palette
            <div
              className="note-card__metadata--colour--pallete"
              style={{ display: palleteVisible }}
            >
              <div
                className="color  bg-red-400"
                onClick={() => setColor("var(--red-400")}
              ></div>
              <div
                className="color  bg-yellow-400"
                onClick={() => setColor("var(--yellow-400")}
              ></div>
              <div
                className="color  bg-green-400"
                onClick={() => setColor("var(--green-400")}
              ></div>
              <div
                className="color  bg-light-blue-400"
                onClick={() => setColor("var(--light-blue-400")}
              ></div>
              <div
                className="color  bg-dark-blue-400"
                onClick={() => setColor("var(--dark-blue-400")}
              ></div>
              <div
                className="color  bg-violet-400"
                onClick={() => setColor("var(--violet-400")}
              ></div>
              <div
                className="color  bg-pink-400"
                onClick={() => setColor("var(--pink-400")}
              ></div>
              <div
                className="color  bg-gray-400"
                onClick={() => setColor("var(--gray-400")}
              ></div>
              <div
                className="color  bg-light"
                onClick={() => setColor("")}
              ></div>
            </div>
          </div>
        </div>
        <div className="requiredError" style={{display:allFieldsRequired===""?"none":"block"}}>{allFieldsRequired}</div>
        <button
          onClick={() => {
            if (title !== "" && label !== "" && body !== "") {
            setLabelArray(labelArray.concat(label))
            addNewNoteHandler()
            }
            else {
              setAllFieldsRequired("All Fields are Required*");
            toast.error("Note couldn't be added");}
          }}
          className="button m-8 p-4 txt-2xl txt-bold  rounded-m flex justify-center align-center"
        >
          Save
        </button>
        <button
          onClick={discardNoteHandler}
          className="button m-8 p-4 txt-2xl txt-bold  rounded-m flex justify-center align-center"
        >
          Discard
        </button>
      </div>
    </>
  );
};

export default NewNoteCard;
