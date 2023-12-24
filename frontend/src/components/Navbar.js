import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  let location = useLocation();
  let navigator = useNavigate();
  const logoutClick = () => {
    localStorage.removeItem("token");
    props.showAlert("success", "Logged out successfully")
    navigator("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span>To-Do</span> List <img src="https://cdn-icons-png.flaticon.com/512/4136/4136043.png" alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
              Home
            </Link>
          </ul>
          {!(localStorage.getItem("token")) ? <form className="d-flex">
            <Link className="btn btn-outline-primary mx-2 text-light" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>
          </form> :
          <form className="d-flex">
            <Link className="btn btn-danger mx-2" to="/login" role="button" onClick={logoutClick}>Log out</Link>
          </form>}
        </div>
      </div>
    </nav>
  );
};