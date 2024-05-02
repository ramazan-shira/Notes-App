import { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";

const NotesList = (props) => {
  const { notes, setNotes, setIsOnEdit, setNoteOnEdit } = props;

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
  }, [search]);

  return (
    <>
      {notes.length > 0 && (
        <div className="current-notes">
          <div className="search-container">
            <input
              type="text"
              className="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search note"
            />
          </div>

          {filteredNotes.map((note) => (
            <div className="note" key={note.id}>
              <div className="note-content">
                <div
                  className="note-title"
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
                  className="note-text"
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

                <p className="date-time">{date}</p>
              </div>
              <div className="note-btn">
                <button onClick={() => handleEdit(note)}>
                  <i className="fa fa-edit"></i>
                </button>
                <button>
                  <i
                    className="fa fa-trash-o"
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
