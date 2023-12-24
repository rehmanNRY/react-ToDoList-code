import React, {useState, useContext} from 'react';
import { Link } from "react-router-dom";
import authContext from "../context/auth/authContext";

export const Login = () => {
    const context = useContext(authContext);
    const { login } = context;

    const [loginForm, setLoginForm] = useState({loginEmail: "", loginPassword: ""});
    const onChange = (e)=>{
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        login(loginForm.loginEmail, loginForm.loginPassword);
        setLoginForm({loginEmail: "", loginPassword: ""});
    }
    return (
        <div className='container col-md-7 authForm'>
            <h2 className='my-4'>Login to your account</h2>
            <p className='my-3'> <Link to="/signup">Sign up</Link> if you're new.</p>
            <form  onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="logEmail" className="form-label">Email address:</label>
                    <input type="email" className="form-control border-danger-subtle" id="logEmail" aria-describedby="emailHelp" placeholder='Enter your E-mail address' required value={loginForm.loginEmail} onChange={onChange} name="loginEmail"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="logPass" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="logPass" value={loginForm.loginPassword} onChange={onChange} required minLength={5} name="loginPassword" placeholder='Enter your password'/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
