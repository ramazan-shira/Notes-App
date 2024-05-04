import { useEffect, useState } from "react";
import "./style.css";

const AddNote = (props) => {
  const { notes, setNotes, isOnEdit, noteOnEdit, setIsOnEdit, darkMode } =
    props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOnEdit) {
      setTitle(noteOnEdit.title);
      setContent(noteOnEdit.content);
    }
  }, [noteOnEdit, isOnEdit]);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    if (title.toLowerCase() === "") {
      setError("Title cannot be empty");
      return;
    }
    if (content.toLowerCase() === "") {
      setError("Note content cannot be empty");
      return;
    }

    const newNote = {
      id: new Date().getTime(),
      title: title,
      content: content,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setTitle("");
    setContent("");
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setError("");
  };

  const handleUpdate = () => {
    if (title.toLowerCase() === "") {
      setError("Title cannot be empty");
      return;
    }
    if (content.toLowerCase() === "") {
      setError("Note content cannot be empty");
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
    localStorage.setItem("notes", JSON.stringify(newNotes));

    setIsOnEdit(false);
    setContent("");
    setTitle("");
    setError("");
  };

  return (
    <div className={darkMode ? "add-notes dark" : "add-notes"}>
      <h2>Add Note</h2>
      <div className={darkMode ? "add-note dark" : "add-note"}>
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isOnEdit ? (
        <button
          className={darkMode ? "save dark" : "save"}
          onClick={handleUpdate}
        >
          Save
        </button>
      ) : (
        <button className={darkMode ? "add dark" : "add"} onClick={handleSave}>
          Add
        </button>
      )}
    </div>
  );
};

export default AddNote;
