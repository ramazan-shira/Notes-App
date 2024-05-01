import "../node_modules/font-awesome/css/font-awesome.min.css";
import "font-awesome/css/font-awesome.min.css";
import AddNote from "./AddNote";
import Note from "./NotesList";
import "./style.css";
import { useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const [isOnEdit, setIsOnEdit] = useState(false);

  const [noteOnEdit, setNoteOnEdit] = useState();
  return (
    <div className="notes">
      <h1>Notes</h1>
      <div className="notes-container">
        <AddNote
          notes={notes}
          setNotes={setNotes}
          isOnEdit={isOnEdit}
          noteOnEdit={noteOnEdit}
          setIsOnEdit={setIsOnEdit}
        />
        <Note
          notes={notes}
          setNotes={setNotes}
          setIsOnEdit={setIsOnEdit}
          setNoteOnEdit={setNoteOnEdit}
        />
      </div>
    </div>
  );
};

export default Notes;
