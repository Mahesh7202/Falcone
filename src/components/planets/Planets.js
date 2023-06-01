// Planets.jsx
import React, { useEffect,useContext, useState } from "react";
import "./styles.css";
import AssignedTable from "../assignedtable/AssignedTable";

import planet1 from "../../assets/planet1.png";
import planet2 from "../../assets/planet2.png";
import planet3 from "../../assets/planet3.png";
import planet4 from "../../assets/planet4.png";
import planet5 from "../../assets/planet5.png";
import planet6 from "../../assets/planet6.png";
import { TableContext } from "../../context/TableContextProvider";
import { Link } from "react-router-dom";
import useAlert from "../../context/useAlert";

function Planets() {
  const [planetsData, setPlanetsData] = useState([]);

  const {addPlanet, isAllPlanetsSelected} = useContext(TableContext);

  const { setAlert } = useAlert();


  const PlanetImageMap = {
    Donlon: planet1,
    Enchai: planet2,
    Jebing: planet3,
    Sapir: planet4,
    Lerbin: planet5,
    Pingasor: planet6,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://findfalcone.geektrust.com/planets"
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setPlanetsData(data);

        setAlert("success", "Select any 4 Planets from 6 Planets. You can drag and drop the elements");


      } catch (error) {
        console.error("Error fetching planet data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDragStart = (event, planet) => {
    event.dataTransfer.setData("planet", JSON.stringify(planet));
    event.dataTransfer.setData("pimage", PlanetImageMap[planet.name]);
  };

  return (
    <div className="section">
      <div className="Container">
        <div className="LeftSection">
          <div className="planet-container">
            <div className="planet-header">
              <h1>Planets To Search</h1>
            </div>
            <div className="planet-description">
              <p>
              King Shan has received intelligence indicating that Al Falcone, the exiled Queen of Falicornia, 
              is hiding in one of the following six planets: DonLon, Enchai, Jebing, Sapir, Lerbin, and Pingasor. 
              It is now up to King Shan and his team to search and locate Queen Al Falcone in order to extend her exile for another 15 years. 
              The fate of Lengaburu hangs in the balance as they embark on this crucial mission.
              </p>
            </div>
            <div className="planet-card-container">
              <div className="planet-row">
                {planetsData.map((planet, index) => {
                  const imageSource = PlanetImageMap[planet.name] || planet1;
                  return (
                    <div
                      className="planet-card"
                      key={index}
                      draggable
                      onDragStart={(event) => handleDragStart(event, planet)}
                    >
                      <div className="planet-image">
                        <img
                          className="planet-rotate"
                          src={imageSource}
                          alt="Planet"
                          width="300px"
                          height="200px"
                          disabled={isAllPlanetsSelected()}
                        />
                      </div>
                      <div className="planet-card-content">
                        <h3>{planet.name}</h3>
                        <p>
                          <b>Distance:</b> {planet.distance}
                        </p>
                        <button
                          disabled={isAllPlanetsSelected()}
                          onClick={() =>{ 
                            if(!addPlanet(
                              planet,
                              imageSource,
                            )){
                              setAlert("error","Same Planet cannot be searched again");
                            }
                          }}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
           { isAllPlanetsSelected() && <Link to="/spaceships" className="assign-vehicle">
              Assign spaceships
          </Link>}
          </div>
        </div>
        <div className="RightSection">
          <AssignedTable />
        </div>
      </div>
    </div>
  );
}

export default Planets;
