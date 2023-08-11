import React from "react";
import axios from 'axios';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import './styles/main.scss';
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route path="/loginPage" element={<LoginPage/>} />
      <Route path="/registrationPage" element={<RegistrationPage/>} />
      <Route path="/DetailsPage/:city" element={<DetailsPage/>}/>
    </Routes>
  );
}

export default App;
