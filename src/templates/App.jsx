import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pluma from "./Pluma";
import Cadastro from "./Cadastro";
import Chat from "./Chat";
import Login from "./Login";
import Password from "./Password";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Password" element={<Password />} />
        <Route path="/Pluma" element={<Pluma />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
