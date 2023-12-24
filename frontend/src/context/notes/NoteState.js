import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const auth_token = localStorage.getItem("token");

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const fetchNotes = async () => {
    try {
      // Api call
      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      props.showAlert("danger", "Some error occured");
    }
  }

  // Add a note
  const addNote = async (description) => {
    try {
      // Api call
      const url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token
        },
        body: JSON.stringify({ description }),
      });
      const json = await response.json();
      setNotes(notes.concat(json));
      // props.showAlert("success", "Task added successfully");
    } catch (error) {
      props.showAlert("danger", "Some error occured");
    }
  }

  // Delete a note
  const deleteNote = async (id) => {
    try {
      // Deleting from UI
      const newNote = notes.filter((note) => { return note._id !== id });
      setNotes(newNote);

      // Api call
      const url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token
        }
      });
      const json = await response.json();
      console.log(json);
      // props.showAlert("success", "Task deleted successfully");
    } catch (error) {
      props.showAlert("danger", "Some error occured");
    }
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;