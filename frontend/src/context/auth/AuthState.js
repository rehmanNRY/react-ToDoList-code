import React from 'react';
import AuthContext from './authContext';
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {
    const navigate = useNavigate();

    // Signup
    const signup = async (fullName, email, password) => {
        // Api call
        const host = "http://localhost:5000";
        const url = `${host}/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: fullName, email, password }),
        });
        const json = await response.json();
        if(json.success){
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("success", "Account created successfully");
            let path = `/`;
            navigate(path);
        }
        else{
            props.showAlert("danger","Invalid credentials");
        }
    }

    // Login
    const login = async (email, password) => {
        // Api call
        const host = "http://localhost:5000";
        const url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if(json.success){
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("success", "Logged in successfully");
            let path = `/`;
            navigate(path);
        }
        else{
            props.showAlert("danger","Invalid credentials");
        }
    }

    return (
        <AuthContext.Provider value={{ signup, login }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState