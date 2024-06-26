import React, { useContext } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
export default function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link className="navbar-brand">Contact-MS</Link>
      </div>
      <div className="navbar-right">
        <Link to="/about" className="navbar-link">
          About
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
            <Link to="/login" className="navbar-link">
              {user.name}
            </Link>
            <Link to="/logout" className="navbar-link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
