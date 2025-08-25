import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pluma from "./Pluma";
import Cadastro from './cadastro'; 
import Chat from "./chat"; 
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Pluma" element={<Pluma />} />
        <Route path="/Chat" element={<Chat />} /> 
      </Routes>
    </Router>
  );
}

export default App;
