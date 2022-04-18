import React, { useState,useEffect } from "react";
import { useTheme } from "../../Context/Theme-Context";
import "./Filter.css";
import { useNotes } from "../../Context/Notes-Context";

const Filter = () => {
  const { notes,filteredNotes,setFilteredNotes,prioritySort,setPrioritySort,dateSort,setDateSort,searchSort,setSearchSort,tagSort,setTagSort } = useNotes();
  const { themeObject } = useTheme();
  const [sortVisible, setSortVisible] = useState(false);
  
  useEffect(() => {
    if(prioritySort!==""){
      setFilteredNotes(() =>
        notes
          .filter((note) => note.priority === prioritySort)
          .sort((a, b) => {
            if (dateSort === "new") {
              return (
                Number(b.date.split("/").join("")) -
                Number(a.date.split("/").join(""))
              );
            }
            if (dateSort === "old") {
              return (
                Number(a.date.split("/").join("")) -
                Number(b.date.split("/").join(""))
              );
            }
          })
          .filter(
            (note) =>
              note.title.includes(searchSort) || note.body.includes(searchSort)
          )
          .filter((note) =>
            tagSort !== ""
              ? note.label.includes(tagSort) === true
              : note.label.includes(tagSort) === false
          )
      );
    }
    else {
      setFilteredNotes(() =>
        notes
          .sort((a, b) => {
            if (dateSort === "new") {
              return (
                Number(b.date.split("/").join("")) -
                Number(a.date.split("/").join(""))
              );
            }
            if (dateSort === "old") {
              return (
                Number(a.date.split("/").join("")) -
                Number(b.date.split("/").join(""))
              );
            }
          })
          .filter(
            (note) =>
              note.title.includes(searchSort) || note.body.includes(searchSort)
          )
          .filter((note) =>
            tagSort !== ""
              ? note.label.includes(tagSort) === true
              : note.label.includes(tagSort) === false
          )
      );
    }
  }, [prioritySort, dateSort, notes, searchSort,tagSort])
  
  const clearHandler = () => {
    setDateSort("");
    setPrioritySort("");
    setTagSort("");
    setFilteredNotes(notes);
  }
  return (
    <div className="filter__container">
      <input
        type="text"
        className="filter-input"
        placeholder="Search"
        style={{ backgroundColor: themeObject.secondary }}
        value={searchSort}
        onChange={(e) => setSearchSort(e.target.value)}
      />
      <div
        style={{ backgroundColor: themeObject.secondary }}
        className="sort txt-2xl txt-bold  rounded-m flex justify-center align-center pointer"
        onClick={() => setSortVisible(!sortVisible)}
      >
        <i
          className=" button__icon material-icons"
          style={{ color: themeObject.text }}
        >
          tune
        </i>
      </div>
      <div
        className="sort__container"
        style={{
          backgroundColor: themeObject.secondary,
          display: sortVisible === true ? "flex" : "none",
        }}
        onClick={() => setSortVisible(!sortVisible)}
      >
        <div
          style={{
            fontSize: "1.5rem",
            color: "var(--dark-blue-500)",
            cursor: "pointer",
            width:"max-content"
          }}
          onClick={clearHandler}
        >
          clear
        </div>
        <div className="sort__heading" style={{ color: themeObject.text }}>
          Sort By Priority
        </div>
        <div className="sort--priority">
          <div className="sort_row">
            <input
              className="high"
              type="radio"
              name="prioritySort"
              id="high-priority-sort"
              checked={prioritySort === "high-priority"}
              onChange={() => setPrioritySort("high-priority")}
            />
            <label
              className="sort__label"
              htmlFor="high-priority-sort"
              style={{ color: themeObject.text }}
              onClick={() => setPrioritySort("high-priority")}
            >
              High
            </label>
          </div>

          <div className="sort_row">
            <input
              className="medium"
              type="radio"
              name="prioritySort"
              id="medium-priority-sort"
              checked={prioritySort === "medium-priority"}
              onChange={() => setPrioritySort("medium-priority")}
            />
            <label
              className="sort__label"
              htmlFor="medium-priority-sort"
              style={{ color: themeObject.text }}
              onClick={() => setPrioritySort("medium-priority")}
            >
              Medium
            </label>
          </div>

          <div className="sort_row">
            <input
              className="low"
              type="radio"
              value="low-priority"
              name="prioritySort"
              id="low-priority-sort"
              checked={prioritySort === "low-priority"}
              onChange={() => setPrioritySort("low-priority")}
            />
            <label
              className="sort__label"
              htmlFor="low-priority-sort"
              style={{ color: themeObject.text }}
              onClick={() => setPrioritySort("low-priority")}
            >
              Low
            </label>
          </div>
        </div>
        <div className="sort__heading" style={{ color: themeObject.text }}>
          Sort By Date
        </div>
        <div className="sort--date">
          <div className="sort_row">
            <input
              className="new"
              type="radio"
              name="date"
              onChange={() => setDateSort("new")}
              id="new"
              checked={dateSort === "new"}
            />
            <label
              className="sort__label"
              htmlFor="new"
              style={{ color: themeObject.text }}
            >
              Newest First
            </label>
          </div>

          <div className="sort_row">
            <input
              className="old"
              onChange={() => setDateSort("old")}
              type="radio"
              name="date"
              id="old"
              checked={dateSort === "old"}
            />
            <label
              className="sort__label"
              htmlFor="old"
              style={{ color: themeObject.text }}
            >
              Oldest First
            </label>
          </div>
          <div className="sort__heading" style={{ color: themeObject.text }}>
            Sort By Label
          </div>
          {notes.map((note) => {
            return note.label.map((label) => {
              return (
                <div key={note.label.indexOf(label)}>
                  {
                    <div className="sort_row">
                      <input
                        className="tag"
                        onChange={() => setTagSort(label)}
                        type="radio"
                        name="label"
                        id={`${label}Tag`}
                        value={label}
                        checked={tagSort === label}
                      />
                      <label
                        className="sort__label"
                        htmlFor={`${label}Tag`}
                        style={{ color: themeObject.text }}
                      >
                        {label}
                      </label>
                    </div>
                  }
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
