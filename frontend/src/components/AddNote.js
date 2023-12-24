import React, {useContext, useState} from 'react'

import noteContext from "../context/notes/noteContext";

export const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({description: ""});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.description);
        setNote({description: ""});
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <form className="addNote" onSubmit={handleClick}>
            <input type="text" required minLength={3} value={note.description} id="description" name="description" onChange={onChange} placeholder='Add something todo..' />
            <button type="submit">Add note</button>
        </form>
    )
}
