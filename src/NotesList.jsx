import { useState } from "react";
import "./style.css";
import moment from "moment";

const NotesList = (props) => {
  const { notes, setNotes, setIsOnEdit, setNoteOnEdit } = props;

  const date = moment().format("DD.MM.YYYY hh:mm");

  const handleDelete = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleEdit = (note) => {
    setIsOnEdit(true);
    setNoteOnEdit(note);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      {notes.length > 0 && (
        <div className="current-notes">
          {notes.map((note) => (
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
