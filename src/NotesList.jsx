import { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";

const NotesList = (props) => {
  const { notes, setNotes, setIsOnEdit, setNoteOnEdit, darkMode } = props;

  const date = moment().format("DD.MM.YYYY hh:mm");

  const [isHovered, setIsHovered] = useState(false);

  const [search, setSearch] = useState("");

  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const handleDelete = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const handleEdit = (note) => {
    setIsOnEdit(true);
    setNoteOnEdit(note);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === "") {
      setFilteredNotes(notes);
    } else {
      const newNotes = filteredNotes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredNotes(newNotes);
    }
  }, [filteredNotes, notes, search]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [setNotes]);
  return (
    <>
      {notes.length > 0 && (
        <div className={darkMode ? "current-notes dark" : "current-notes"}>
          <div
            className={darkMode ? "search-container dark" : "search-container"}
          >
            <input
              type="text"
              className="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search note"
            />
          </div>

          {filteredNotes.map((note) => (
            <div className={darkMode ? "note dark" : "note"} key={note.id}>
              <div className="note-content">
                <div
                  className={darkMode ? "note-title dark" : "note-title"}
                  key={note.id}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {isHovered ? (
                    <p>{note.title}</p>
                  ) : (
                    <p>
                      {note.title.substring(0, 60)}
                      {note.title.length > 60 ? "..." : ""}
                    </p>
                  )}
                </div>
                <div
                  className={darkMode ? "note-text dark" : "note-text"}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {isHovered ? (
                    <p>{note.content}</p>
                  ) : (
                    <p>
                      {note.content.substring(0, 80)}
                      {note.content.length > 80 ? "..." : ""}
                    </p>
                  )}
                </div>
                <p className={darkMode ? "date-time dark" : "date-time"}>
                  {date}
                </p>
              </div>
              <div className="note-btn">
                <button onClick={() => handleEdit(note)}>
                  <i
                    className={darkMode ? "fa fa-edit dark" : "fa fa-edit"}
                  ></i>
                </button>
                <button>
                  <i
                    className={
                      darkMode ? "fa fa-trash-o dark" : "fa fa-trash-o"
                    }
                    onClick={() => handleDelete(note.id)}
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotesList;
