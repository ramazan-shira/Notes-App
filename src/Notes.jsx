import AddNote from "./AddNote";
import Note from "./NotesList";
import "./style.css";
import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";

import Theme from "./Theme";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const [isOnEdit, setIsOnEdit] = useState(false);

  const [noteOnEdit, setNoteOnEdit] = useState();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkBg");
    } else {
      document.body.classList.remove("darkBg");
    }
  }, [darkMode]);
  return (
    <>
      <div className="theme">
        <Theme darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className={darkMode ? "notes dark" : "notes"}>
        <h1>Notes</h1>
        <div className="notes-container">
          <AddNote
            notes={notes}
            setNotes={setNotes}
            isOnEdit={isOnEdit}
            noteOnEdit={noteOnEdit}
            setIsOnEdit={setIsOnEdit}
            darkMode={darkMode}
          />
          <Note
            notes={notes}
            setNotes={setNotes}
            setIsOnEdit={setIsOnEdit}
            setNoteOnEdit={setNoteOnEdit}
            darkMode={darkMode}
          />
        </div>
      </div>
    </>
  );
};

export default Notes;
