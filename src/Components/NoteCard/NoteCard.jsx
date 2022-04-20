import React, { useEffect, useState } from "react";
import "./NoteCard.css";
import { useTheme } from "../../Context/Theme-Context";
import { useNotes } from "../../Context/Notes-Context";

const NoteCard = ({ data }) => {
  const { themeObject } = useTheme();
  const [color, setColor] = useState(data.color);
  const [palleteVisible, setPalleteVisible] = useState("none");
  const { archiveNoteHandler, deleteNoteHandler, editNoteHandler,labelNotes } = useNotes();
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [label, setLabel] = useState("");
  const [edit, setEdit] = useState(false);
  const [labelAdd, setLabelAdd] = useState(false);
  const [priorityVisible, setPriorityVisible] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [priorityValue, setPriorityValue] = useState("");
 
  const setColorHandler = (newColor) => {
    editNoteHandler({...data,color:newColor});
  }
  const setLabelHandler = () => {
    if(data.label.includes(label)===false)
      editNoteHandler({ ...data, label: data.label.concat(label) });
    else {
     return
    }
    
  }
  const setPriorityHandler = () => {
    editNoteHandler({ ...data, priority: priorityValue });
  };
  const removeLabel = (currLabel) => {
    editNoteHandler({...data,label:data.label.filter((value)=>value!==currLabel)})
  }
  const setPinnedHandler = () => {
    editNoteHandler({...data,pinned:!data.pinned})
  }
  
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
          display: edit ? "none" : "flex",
        }}
      >
        {data.title}
        {data.priority !== "" ? (
          <div
            className="priority__tag"
            style={{
              backgroundColor:
                data.priority === "high-priority"
                  ? "var(--red-500)"
                  : data.priority === "medium-priority"
                  ? "var(--yellow-500)"
                  : "var(--light-blue-500)",
            }}
          ></div>
        ) : null}
      </div>
      <div
        className="note-card__pin material-icons"
        style={{
          color: themeObject.text,
          backgroundColor: data.pinned === true ? themeObject.primary : "",
        }}
        onClick={() => setPinnedHandler()}
      >
        push_pin
      </div>
      <div
        className="note-card__body"
        style={{
          color: themeObject.text,
          display: edit ? "none" : "block",
        }}
      >
        {data.body}
      </div>
      <div className="note-card__label__container">
        {data.label.map((label) => {
          return (
            <div
              className="note-card__label"
              style={{
                color: themeObject.text,
                backgroundColor: themeObject.primary,
              }}
              key={data.label.indexOf(label)}
            >
              {label}
              <div
                className="remove__label material-icons pointer"
                onClick={() => removeLabel(label)}
                style={{ marginLeft: "1rem" }}
              >
                highlight_off
              </div>
            </div>
          );
        })}
      </div>

      <label
        className="label"
        htmlFor="new-note-card__title"
        style={{
          color: themeObject.text,
          display: edit ? "block" : "none",
        }}
      >
        Title
      </label>
      <input
        id="new-note-card__title"
        className="new-note-card__title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: edit ? "block" : "none" }}
      />
      <label
        className="label"
        htmlFor="new-note-card__body"
        style={{
          color: themeObject.text,
          display: edit ? "block" : "none",
        }}
      >
        Body
      </label>
      <textarea
        id="new-note-card__body"
        className="new-note-card__body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ display: edit ? "block" : "none" }}
      />

      <button
        onClick={() => {
          editNoteHandler({ ...data, title: title, body: body });
          setEdit(false);
        }}
        className="edit-button button m-8 p-4 txt-2xl txt-bold  rounded-m flex justify-center align-center"
        style={{ display: edit ? "flex" : "none" }}
      >
        Save
      </button>
      <div className="note-card__metadata" style={{ color: themeObject.text }}>
        <div className="note-card__metadata--timestamp ">
          Created on {data.date.slice(0,9)}
        </div>
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
              onClick={() => setColorHandler("var(--red-400")}
            ></div>
            <div
              className="color  bg-yellow-400"
              onClick={() => setColorHandler("var(--yellow-400")}
            ></div>
            <div
              className="color  bg-green-400"
              onClick={() => setColorHandler("var(--green-400")}
            ></div>
            <div
              className="color  bg-light-blue-400"
              onClick={() => setColorHandler("var(--light-blue-400")}
            ></div>
            <div
              className="color  bg-dark-blue-400"
              onClick={() => setColorHandler("var(--dark-blue-400")}
            ></div>
            <div
              className="color  bg-violet-400"
              onClick={() => setColorHandler("var(--violet-400")}
            ></div>
            <div
              className="color  bg-pink-400"
              onClick={() => setColorHandler("var(--pink-400")}
            ></div>
            <div
              className="color  bg-gray-400"
              onClick={() => setColorHandler("var(--gray-400")}
            ></div>
            <div
              className="color bg-light"
              onClick={() => setColorHandler("")}
            ></div>
          </div>
        </div>
        <div
          className="note-card__metadata--edit material-icons"
          onClick={() => setEdit(!edit)}
        >
          edit
        </div>
        <div
          className="note-card__metadata--archive material-icons"
          onClick={() => archiveNoteHandler(data)}
        >
          archive
        </div>
        <div
          className="note-card__metadata--priority material-icons"
          onClick={() => setPriorityVisible(!priorityVisible)}
        >
          priority_high
        </div>
        <div
          className="note-card__metadata--add-priority"
          style={{
            display: priorityVisible === true ? "flex" : "none",
            backgroundColor: themeObject.secondary,
          }}
        >
          <div className="priority-input__container">
            {" "}
            <input
              className="priority"
              type="radio"
              name="priority"
              id="high-priority"
              value="high-priority"
              onChange={(e) => setPriorityValue(e.target.value)}
              checked={priorityValue === "high-priority"}
            />
            <label
              className="priority__label"
              htmlFor="high-priority"
              style={{ color: themeObject.text }}
              onClick={() => setPriorityValue("high-priority")}
            >
              High Priority
            </label>
          </div>

          <div className="priority-input__container">
            {" "}
            <input
              className="priority"
              type="radio"
              name="priority"
              id="medium-priority"
              value="medium-priority"
              checked={priorityValue === "medium-priority"}
              onChange={(e) => setPriorityValue(e.target.value)}
            />
            <label
              className="priority__label"
              htmlFor="medium-priority"
              style={{ color: themeObject.text }}
              onClick={() => setPriorityValue("medium-priority")}
            >
              Medium Priority
            </label>
          </div>

          <div className="priority-input__container">
            <input
              className="priority"
              type="radio"
              name="priority"
              id="low-priority"
              value="low-priority"
              checked={priorityValue === "low-priority"}
              onChange={(e) => setPriorityValue(e.target.value)}
            />
            <label
              className="priority__label"
              htmlFor="low-priority"
              style={{ color: themeObject.text }}
              onClick={() => setPriorityValue("low-priority")}
            >
              low Priority
            </label>
          </div>

          <button
            onClick={() => {
              if (priorityValue !== "") {
                setPriorityHandler();
                setPriorityValue("");
                setPriorityVisible(false);
              } else {
                setPriorityVisible(false);
              }
            }}
            className="add-label-button button m-8 p-4 txt-2xl txt-bold  rounded-m flex justify-center align-center"
          >
            <i className="button__icon material-icons">check</i>Confirm
          </button>
        </div>
        <div
          className="note-card__metadata--delete material-icons"
          onClick={() => deleteNoteHandler(data._id)}
        >
          delete
        </div>
        <div
          className="note-card__metadata--label material-icons relative"
          onClick={() => {
            setLabel("");
            setLabelAdd(!labelAdd);
          }}
        >
          label
        </div>
        <div
          className="note-card__metadata--add-label"
          style={{
            display: labelAdd === true ? "flex" : "none",
            backgroundColor: themeObject.secondary,
          }}
        >
          <label
            className="label"
            htmlFor="note-card-add-label"
            style={{ color: themeObject.text }}
          >
            Add Label
          </label>
          <input
            className="note-card-add-label"
            type="text"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <button
            onClick={() => {
              if (label !== "") {
                setLabelHandler();
                setLabel("");
                setLabelAdd(false);
              } else {
                setLabelAdd(false);
              }
            }}
            className="add-label-button button m-8 p-4 txt-2xl txt-bold  rounded-m flex justify-center align-center"
          >
            <i className="button__icon material-icons">add</i>Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
