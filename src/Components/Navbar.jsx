import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">
        Users
      </Link>
      <Link to="/bookmark" className="navbar-link">
        Bookmarked Users
      </Link>
    </div>
  );
};

export default Navbar;
