import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pluma from "./Pluma"; 
import Chat from "./chat"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pluma />} />
        <Route path="/Chat" element={<Chat />} /> 
      </Routes>
    </Router>
  );
}

export default App;
