import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import checkImg from '../images/check.png';
import uncheckImg from '../images/uncheck.png';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, showAlert } = props;

    const toggleNoteTitle = async (id) => {
        try {
            // Api call
            const host = "http://localhost:5000";
            const auth_token = localStorage.getItem("token");
            const url = `${host}/api/notes/toggletitle/${id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": auth_token
                }
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            showAlert("danger", "Some error occurred");
        }
    };

    // Note status done pending or doing
    const clockImg = "https://cdn-icons-png.flaticon.com/512/5957/5957795.png";
    const [checkImgShow, setcheckImgShow] = useState(note.title? checkImg : uncheckImg);
    const [noteItemCls, setNoteItemCls] = useState(note.title? "noteItemDone" : "noteItemUndone");
    const checkBtnClick = async (noteId) => {
        if (checkImgShow === uncheckImg) {
            setcheckImgShow(clockImg);
            setNoteItemCls("noteItemClock");
        } else if (checkImgShow === clockImg) {
            await toggleNoteTitle(noteId);
            setcheckImgShow(checkImg);
            setNoteItemCls("noteItemDone");
        } else if (checkImgShow === checkImg) {
            await toggleNoteTitle(noteId);
            setcheckImgShow(uncheckImg);
            setNoteItemCls("noteItemUndone");
        }
    }

    return (
        <div className={`noteItem ${noteItemCls}`}>
            <div>
                <button type="button" onClick={() => { checkBtnClick(note._id) }}>
                    <img src={checkImgShow} alt="" />
                </button>
                <p>{note.description}</p>
            </div>
            <span onClick={() => { deleteNote(note._id) }}><i className='bx bx-x mx-2'></i></span>
        </div>
    )
}

export default NoteItem