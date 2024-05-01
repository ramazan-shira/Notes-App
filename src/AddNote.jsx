import { useEffect, useState } from "react";
import "./style.css";

const AddNote = (props) => {
  const { notes, setNotes, isOnEdit, noteOnEdit, setIsOnEdit } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOnEdit) {
      setTitle(noteOnEdit.title);
      setContent(noteOnEdit.content);
    }
  }, [noteOnEdit]);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    if (notes.find((note) => note.title === "")) {
      setError("Title cannot be empty");
      return;
    }

    if (notes.find((note) => note.content === "")) {
      setError("Title cannot be empty");
      return;
    }

    const newNote = {
      id: new Date().getTime(),
      title: title,
      content: content,
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleUpdate = () => {
    if (notes.find((note) => note.title === "")) {
      setError("Title cannot be empty");
      return;
    }

    if (notes.find((note) => note.content === "")) {
      setError("Title cannot be empty");
      return;
    }
    const newNotes = notes.map((note) => {
      if (note.id === noteOnEdit.id) {
        note.title = title;
        note.content = content;
      }
      return note;
    });
    setNotes(newNotes);
    setIsOnEdit(false);
    setContent("");
    setTitle("");
  };

  return (
    <div className="add-notes">
      <h2>Add Note</h2>
      <div className="add-note">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitle}
        />
        <textarea
          placeholder="Enter note content"
          value={content}
          onChange={handleContent}
        ></textarea>
      </div>
      {isOnEdit ? (
        <button className="save" onClick={handleUpdate}>
          Save
        </button>
      ) : (
        <button className="save" onClick={handleSave}>
          Add
        </button>
      )}
    </div>
  );
};

export default AddNote;
