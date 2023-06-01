import React, { useContext, useState } from "react";
import "./styles.css";
import { TableContext } from "../../context/TableContextProvider";

function AssignedTable({vehicleData}) {
  const {removeTableData, addPlanet, addVehicle, tableData } = useContext(TableContext);

 
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, type, index) => {
    event.preventDefault();

    if (type === "vehicle") {
      const vehicle = JSON.parse(event.dataTransfer.getData("vehicle"));

      const vimage = event.dataTransfer.getData("vimage");

      addVehicle(vehicle, vimage, index-1);
    } else {
      const planet = JSON.parse(event.dataTransfer.getData("planet"));

      const pimage = event.dataTransfer.getData("pimage");

      addPlanet(planet, pimage, index-1);
    }

  };

  const handleRemoveItem = (index,type,name) => {
    if(type==="vehicle"){
      vehicleData.map((vehicle)=>{
        if(vehicle.name === name) vehicle.total_no=vehicle.total_no+1;
      })
    }
   
    removeTableData(index-1,type);
  };

  return (
    <div className="AssignedTable" onDragOver={handleDragOver}>
      <h2>Assigned Planets & Vehicles</h2>
      <table>
        <thead>
          <tr>
            <th>Planets</th>
            <th>Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((index) => (
            <tr key={index}>
              <td>
                <div
                  className="planet-dropzone"
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, "planet", index)}
                >
                  <div className="planet-container">
                    {tableData&& tableData[index - 1]?.pimage && (
                      <div>
                        <img
                          className="dragged-planet-image"
                          src={tableData[index - 1].pimage}
                          draggable={false}
                        />
                          <button
                            className="remove-button"
                            onClick={()=>handleRemoveItem(index,"planet")}
                          >
                            Remove
                          </button>
                      </div>
                    )}
                  </div>
                  {!tableData[index - 1]?.pimage &&
                    "No Planets Selected"}
                </div>
              </td>
              <td>
                <div
                  className="vehicle-dropzone fixed"
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, "vehicle", index)}
                >
                  <div className="vehicle-container">
                    {tableData && tableData[index - 1]?.vimage && (
                      <div>
                        <img
                          className="dragged-vehicle-image"
                          src={tableData[index - 1].vimage}
                          draggable={false}
                        />
                          <button
                            className="remove-button"
                            onClick={()=>handleRemoveItem(index,"vehicle",tableData[index-1].vehicle.name)}
                          >
                            Remove
                          </button>
                      </div>
                    )}
                  </div>
                  {!tableData[index - 1]?.vimage &&
                    "No Vehicle Assigned"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignedTable;
