// SpaceVehicles.jsx
import React, { useEffect, useContext, useState } from "react";
import "./styles.css";
import AssignedTable from "../assignedtable/AssignedTable";
import spacerocket from "../../assets/spacerocket.png";
import spaceshuttle from "../../assets/spaceshuttle.png";
import spaceship from "../../assets/spaceship.png";
import spacepod from "../../assets/spacepod.png";
import { TableContext } from "../../context/TableContextProvider";

import { Link } from "react-router-dom";
import useAlert from "../../context/useAlert";

function SpaceVehicles() {
  const [vehicleData, setVehicleData] = useState([]);
  const { isAllVehicelesSelected, isAllPlanetsSelected, addVehicle } = useContext(TableContext);
  const { setAlert } = useAlert();

  const vehicleImageMap = {
    Spacepod: spacepod,
    Spacerocket: spacerocket,
    Spaceshuttle: spaceshuttle,
    Spaceship: spaceship,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://findfalcone.geektrust.com/vehicles"
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setVehicleData(data);

        setAlert(
          "success",
          "Select any 4 Vehicles. You can drag and drop the elements"
        );
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDragStart = (event, vehicle) => {
    event.dataTransfer.setData("vehicle", JSON.stringify(vehicle));
    event.dataTransfer.setData(
      "vimage",
      vehicleImageMap[vehicle.name.replace(/\s/g, "")]
    );
  };

  return (
    <div className="section">
      <div className="Container">
        <div className="LeftSection">
          {isAllPlanetsSelected() ? (
            <div className="vehicle-container">
              <div className="vehicle-header">
                <h1>Space Vehicles</h1>
              </div>
              <div className="vehicle-description">
                <p>
                  King Shan faces a challenge as he has limited resources and
                  can only send his army to four out of the six planets.
                  Additionally, there are four types of vehicles available, each
                  with varying units and ranges. It is crucial to consider the
                  range of each vehicle in relation to the distance to the
                  planet to ensure a feasible mission. The speed of the chosen
                  vehicles will directly impact the time required to complete
                  the search for Queen Al Falcone.
                </p>
              </div>
              <div className="vehicle-card-container">
                <div className="vehicle-row">
                  {vehicleData.map((vehicle, index) => {
                    const vehicleName = vehicle.name.replace(/\s/g, "");
                    const imageSource =
                      vehicleImageMap[vehicleName] || spacepod;
                    return (
                      <div
                        className="vehicle-card"
                        key={index}
                        draggable
                        onDragStart={(event) => handleDragStart(event, vehicle)}
                      >
                        <img
                          className="vehicle-image vehicle-rotate"
                          width="200px"
                          height="200px"
                          src={imageSource}
                          alt="Vehicle"
                          disabled={isAllVehicelesSelected()}
                        />
                        <div className="vehicle-card-content">
                          <h3>{vehicle.name}</h3>
                          <p>
                            <b>Unit:</b> {vehicle.total_no}
                          </p>
                          <p>
                            <b>Max Distance:</b> {vehicle.max_distance}{" "}
                            Megamiles
                          </p>
                          <p>
                            <b>Speed:</b> {vehicle.speed} Megamiles/hour
                          </p>
                          <button
                            disabled={vehicle.total_no === 0}
                            onClick={() => {
                              if (addVehicle(vehicle, imageSource)) {
                                if (vehicle.total_no > 0) {
                                  vehicle.total_no = vehicle.total_no - 1;
                                }
                              } else {
                                setAlert(
                                  "error",
                                  "The distance is not match for the planet distance please select another suitable spaceship"
                                );
                              }
                            }}
                          >
                            Assigne Vehicle
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isAllVehicelesSelected() && (
                <Link to="/falcon" className="assign-vehicle">
                  Let's Start
                </Link>
              )}
            </div>
          ) : (
            <div className="no-planets-selected">
              <div className="text">
                Select the planets before selecting the vehicle
              </div>
              <Link to="/planets" className="assign-vehicle">
                  Go To Planets
              </Link>
            </div>
          )}
        </div>
        <div className="RightSection">
          <AssignedTable vehicleData={vehicleData} />
        </div>
      </div>
    </div>
  );
}

export default SpaceVehicles;
