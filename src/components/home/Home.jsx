import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="homepage">
      <div className="background-image">
        <div className="overlay"></div>
        <header className="header">
          <h1>Finding Queen</h1>
        </header>
        <div className="content">
          <p>Our problem is set in the distant galaxy of Tara B, 
            specifically in the planet of Lengaburu. After a recent
            war with the neighboring planet Falicornia, King Shan has
            exiled the Queen of Falicornia for 15 years. Queen Al
            Falcone is now in hiding. However, if King Shan can find her 
            before the 15 years are up, she will be exiled for another 15 years.
          </p>
          <Link to="/planets" className="start-journey-btn">
            Let's Start the Journey
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
