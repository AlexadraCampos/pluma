import React from "react";

const Home = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="wallpaper-fundo">
      <div className="header">
        <span role="img" aria-label="pássaro" className="header-icon">
          <img src="pluma-icon.png" alt="icon-pluma" />
        </span>
        <h1 className="header-title">Bem-vindo ao Pluma</h1>
      </div>

      <div className="container">
        <div onClick={() => handleNavigation("/bird")} className="card">
          <div className="icon">📖</div>
          <p className="text">Guia de Espécies</p>
        </div>

        <div onClick={() => handleNavigation("/faq")} className="card">
          <div className="icon">💬</div>
          <p className="text">Dúvidas</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
