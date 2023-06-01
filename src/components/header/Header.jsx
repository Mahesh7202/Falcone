import React, { useState } from "react";
import "./styles.css";
import { Link } from 'react-router-dom';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Navbar">
      <span className="nav-logo">Falcone</span>
      <div className={`nav-items ${isOpen && "open"}`}>
      <Link to="/">Home</Link>
        <Link to="/planets">Planets</Link>
        <Link to="/spaceships">Space Ships</Link>
        <Link to="/falcon">Find Falcone</Link>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Header;
