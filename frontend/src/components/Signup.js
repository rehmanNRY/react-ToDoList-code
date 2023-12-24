import React, {useContext, useState} from 'react'
import { Link } from "react-router-dom";
import authContext from "../context/auth/authContext";

export const Signup = () => {
    const context = useContext(authContext);
    const {signup} = context;

    const [form, setForm] = useState({fullName: "", email: "", password: ""});
    const onChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        signup(form.fullName, form.email, form.password);
        setForm({fullName: "", email: "", password: ""});
    }
    return (
        <div className='container col-md-7 authForm'>
            <h2 className='my-3'>Create account</h2>
            <p className='my-2'> <Link to="/login">Login</Link> if you already have one.</p>
            <form onSubmit={handleClick}>
            <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full name:</label>
                    <input type="text" className="form-control" id="fullName" placeholder='Enter your Full name' aria-describedby="emailHelp" required minLength={3} value={form.fullName} onChange={onChange} name="fullName"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="signEmail" className="form-label">Email address:</label>
                    <input type="email" className="form-control" placeholder='Enter your E-mail address' id="signEmail" aria-describedby="emailHelp" required value={form.email} onChange={onChange} name="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="signPass" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="signPass" value={form.password} onChange={onChange} name="password" required minLength={5} placeholder='Enter your password min: 5 characters' />
                </div>
                <button type="submit" className="btn btn-primary" >Create account</button>
            </form>
        </div>
    )
}
