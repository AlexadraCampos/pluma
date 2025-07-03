import React from "react";

const Home = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="container">
      <div onClick={() => handleNavigation("/bird")} className="card">
        <div className="icon">📖</div>
        <p className="text">Guia de Espécies</p>
      </div>
      <div onClick={() => handleNavigation("/care")} className="card">
        <div className="icon">❤‍🩹</div>
        <p className="text">Cuidados</p>
      </div>
      <div onClick={() => handleNavigation("/birth")} className="card">
        <div className="icon">📄</div>
        <p className="text">Ficha de Nascimento</p>
      </div>
      <div onClick={() => handleNavigation("/faq")} className="card">
        <div className="icon">💬</div>
        <p className="text">Dúvidas</p>
      </div>
    </div>
  );
};

export default Home;
