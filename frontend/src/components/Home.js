import React from 'react';
import { Notes } from './Notes';
import { AddNote } from './AddNote';
import '../style.css'

export const Home = (props) => {
  return (
    <div className='todoHome'>
      <h5 className='todoTitle'>To-Do List <img src="https://cdn-icons-png.flaticon.com/512/4136/4136043.png" alt="todo icon" /></h5>
      <AddNote />
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}
