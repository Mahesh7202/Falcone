import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Planets from "./components/planets/Planets";
import SpaceVehicles from "./components/SpaceVehicles/SpaceVehicles";
import "./App.css";
import { TableContext } from "./context/TableContextProvider";
import Falcone from "./components/falcon/Falcone";

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/planets" element={<Planets/>} />
          <Route path="/spaceships" element={<SpaceVehicles/>} />
          <Route path="/falcon" element={<Falcone/>} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
