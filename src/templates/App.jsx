import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pluma from "./Pluma.jsx";
import Cadastro from "./cadastro.jsx";
import Chat from "./chat.jsx";
import Login from "./Login.jsx";
import Password from "./password.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/password" element={<Password />} />
        <Route path="/Pluma" element={<Pluma />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;