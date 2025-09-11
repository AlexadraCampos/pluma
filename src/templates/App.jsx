import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pluma from "./Pluma";
import Cadastro from "./cadastro"; 
import Chat from "./chat"; 
import Login from "./login";
import Password from "./Password";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/password" element={<Password />} />
        <Route path="/pluma" element={<Pluma />} />
        <Route path="/chat" element={<Chat />} /> 
      </Routes>
    </Router>
  );
}

export default App;
