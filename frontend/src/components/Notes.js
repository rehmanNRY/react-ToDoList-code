import React, { useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchNotes } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="todoNotes">
      <div className="">
        {notes.length === 0 && <h2>No notes to display</h2>}
      </div>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} showAlert={props.showAlert}/>;
      })}
    </div>
  )
}
