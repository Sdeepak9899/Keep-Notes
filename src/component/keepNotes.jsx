"use client";

import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

export default function InputAreaBox() {
  let localStoredNotes;
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");
  if (typeof window !== "undefined") {
    localStoredNotes = JSON.parse(localStorage.getItem("notes")) || [];
  }
  let [notes, setNotes] = useState(localStoredNotes);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(null);

  const addData = (event) => {
    event.preventDefault();
    if (inputTitle && inputText) {
      if (isEditing) {
        const updatedNotes = notes.map((note, index) =>
          index === tempData ? { title: inputTitle, text: inputText } : note
        );
        setNotes(updatedNotes);
        setIsEditing(false);
        setTempData(null);
      } else {
        setNotes([...notes, { title: inputTitle, text: inputText }]);
      }
      setInputTitle("");
      setInputText("");
    }
  };

  const editNote = (index) => {
    setInputTitle(notes[index].title);
    setInputText(notes[index].text);
    setIsEditing(true);
    setTempData(index);
  };

  const deleteButton = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  return (
    <div className=" p-4">
      <form
        onSubmit={addData}
        className="relative max-w-lg mx-auto my-8  p-4 shadow-md rounded-lg w-full"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 outline-none text-base rounded-md"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <textarea
          placeholder="Take a note..."
          className="w-full border p-2 outline-none text-base resize-none mt-2 rounded-md"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex justify-center mt-4">
          <button
            className="flex items-center gap-2 bg-yellow-400 text-white rounded-full px-6 py-3 cursor-pointer shadow-md hover:bg-yellow-500 transition"
            type="submit"
          >
            {isEditing ? (
              <>
                <MdEdit className="text-lg" />
                <span>Update</span>
              </>
            ) : (
              <>
                <FaPlus className="text-lg" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify- gap-4">
        {notes.map((note, index) => (
          <div
            className="border border-amber-300 w-full sm:w-60 rounded-lg shadow-lg p-4 hover:shadow-xl transition"
            key={index}
          >
            <h1 className="text-base font-semibold">{note.title}</h1>
            <p className="text-base mt-2 whitespace-pre-wrap break-words">
              {note.text}
            </p>
            <div className="flex justify-between mt-2 px-8">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => editNote(index)}
              >
                <MdEdit size={20} />
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => deleteButton(index)}
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
