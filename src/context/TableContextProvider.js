import { createContext, useState } from "react";

function TableContextProvider(props) {
  const [tableData, setTableData] = useState([null, null, null, null]);

  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const findFirstPlanetIndex = (array) => {
    return array.findIndex((value) => value === null);
  };

  const findFirstVehicleIndex = (array) => {
    return array.findIndex((item) => item?.vehicle === null);
  };

  const isPresent = (name) => {
    return planets.includes(name);
  };

  const isAcceptable = (vehicle,index)=>{
    let data = tableData[index].planet
    return data.distance<=vehicle.max_distance;
  }

  const removeTableData = (index, type) => {
    const updatedTableData = [...tableData];

    let assignedVehicle = updatedTableData[index];

    if (type === "vehicle" && assignedVehicle != null) {
      assignedVehicle.vehicle = null;
      assignedVehicle.vimage = null;
    } else if (type === "planet" && assignedVehicle != null) {
      assignedVehicle = null;
      planets[index] = null;
    }

    updatedTableData[index] = assignedVehicle;

    setTableData(updatedTableData);
  };

  const addPlanet = (planet, image, index) => {
    if (!isPresent(planet.name)) {
      if (index == null) {
        index = findFirstPlanetIndex(tableData);
      }

      const updatedTableData = [...tableData];
      let assignedVehicle = updatedTableData[index];

      if (assignedVehicle == null || assignedVehicle == undefined) {
        assignedVehicle = createPlanetObject(planet, image);
      } else {
        assignedVehicle.planet = planet;
        assignedVehicle.pimage = image;
      }

      planets[index] = planet.name;
      
      updatedTableData[index] = assignedVehicle;
      setTableData(updatedTableData);
      return true;
    }
    return false;
  };

  const addVehicle = (vehicle, image, index) => {
      if (index == null) {
        index = findFirstVehicleIndex(tableData);
      }
      const updatedTableData = [...tableData];
      let assignedVehicle = updatedTableData[index];

      if (assignedVehicle !== null && isAcceptable(vehicle,index)){
        assignedVehicle.vehicle = vehicle;
        assignedVehicle.vimage = image;
        vehicles[index] = vehicle.name;
        updatedTableData[index] = assignedVehicle;
        setTableData(updatedTableData);
        return true;
      }
      return false
    
  };

 



  const createPlanetObject = (planet, image) => {
    return {
      planet: planet,
      vehicle: null,
      vimage: null,
      pimage: image,
    };
  };


  const isAllPlanetsSelected = () => {
    return tableData.every((item) => item?.planet !== null && item != null);
  };

  const isAllVehicelesSelected = () => {
    return tableData.every((item) => item?.vehicle !== null && item != null);
  };

  const reset = ()=>{
    setTableData([null, null, null, null]);
    setPlanets([]);
    setVehicles([]);
  }
 
  return (
    <TableContext.Provider
      value={{
        addPlanet,
        addVehicle,
        removeTableData,
        isAllVehicelesSelected,
        isAllPlanetsSelected,
        reset,
        tableData,
        planets,
        vehicles,
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
}

const TableContext = createContext();

export default TableContextProvider;

export { TableContext };
