import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../../context/TableContextProvider";
import './styles.css'
import { Link } from "react-router-dom";

function Falcone() {
  const [result, setResult] = useState([]);
  const [time, setTime] = useState([]);

  const [token, setToken] = useState();
  const {reset, tableData, planets, vehicles } = useContext(TableContext);

  const getData = (token) => {
    return {
      token: token,
      planet_names: planets,
      vehicle_names: vehicles,
    };
  };

  const calculateTimeTaken = () => {
    const result = tableData.reduce((total, data) => {
      const divisionResult = data.planet.distance / data.vehicle.speed;
      return total + divisionResult;
    }, 0);
    reset();

    setTime(result);
    
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://findfalcone.geektrust.com/token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error fetching planet data:", error);
      }
    };

    fetchToken();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://findfalcone.geektrust.com/find", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getData(token)),
      });
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      const result = data?.status === "success" ? data.planet_name : data.error;

      setResult(result);
    } catch (error) {
      console.error("Error fetching planet data:", error);
    }
  };

  return (
    <div className="homepage">
      <div className="background-image">
        <div className="overlay"></div>
        <header className="header">
          <h1>Finding Queen</h1>
        </header>
        <div className="content">
          <p>Queen was Found At: <b style={{color: "#fff"}}>{result}</b> </p>
          <p>Time taken to reach: <b style={{color: "#fff"}}>{time}</b> </p>

         {planets.length === 4 && vehicles.length === 4 && <button
            onClick={() => {
              fetchData(token);
              calculateTimeTaken();
            }}
            className="start-journey-btn"
          >
            Find Out!
          </button>}

          <Link to="/" className="start-journey-btn" >Let's Start Over</Link>
        </div>
      </div>
    </div>
  );
}

export default Falcone;
