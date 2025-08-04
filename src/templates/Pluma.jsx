import React, { useState } from "react";
import Chat from "./chat";
import "../css/Home.css";

const Pluma = () => {
  const [secaoAtual, setSecaoAtual] = useState("chat");
  const [menuVisivel, setMenuVisivel] = useState(true);

  const toggleMenu = () => {
    setMenuVisivel((prev) => !prev);
  };

  const renderConteudo = () => {
    switch (secaoAtual) {
      case "chat":
        return <Chat />;
      case "identification":
        return (
          <div>
            <h2>🦜 Identificação de Aves</h2>
          </div>
        );
      case "care":
        return (
          <div>
            <h2>🍽️ Cuidados com Aves</h2>
          </div>
        );
      case "treatment":
        return (
          <div>
            <h2>💊 Tratamento de Doenças</h2>
          </div>
        );
      case "faq":
        return (
          <div>
            <h2>📚 Perguntas Frequentes</h2>
          </div>
        );
      case "legal":
        return (
          <div>
            <h2>⚖️ Informações Legais</h2>
          </div>
        );
      case "genealogy":
        return (
          <div>
            <h2>🌳 Árvore Genealógica</h2>
          </div>
        );
      default:
        return <Chat />;
    }
  };

  return (
    <div className="layout">
      {/* Botão para abrir/fechar o menu */}
      <button onClick={toggleMenu} className="menu-toggle-btn">
        {menuVisivel ? "❌" : "☰"}
      </button>

      {/* Menu lateral com animação */}
      <aside className={`sidebar ${menuVisivel ? "slide-in" : "slide-out"}`}>
        <div className="logo-container">
          <img src="icon_pluma.png" alt="Logo Pluma" style={{ padding: "5px", height: "40px", margin: "10px"}} />
        </div>
        
        <button onClick={() => setSecaoAtual("chat")}>🦜 Chat (IA)</button>
        <button onClick={() => setSecaoAtual("identification")}>
          📘 Identificação
        </button>
        <button onClick={() => setSecaoAtual("care")}>🍽️ Cuidados</button>
        <button onClick={() => setSecaoAtual("treatment")}>
          💊 Tratamento
        </button>
        <button onClick={() => setSecaoAtual("faq")}>📚 FAQ</button>
        <button onClick={() => setSecaoAtual("legal")}>⚖️ Legais</button>
        <button onClick={() => setSecaoAtual("genealogy")}>
          🌳 Genealogia
        </button>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">{renderConteudo()}</main>
    </div>
  );
};

export default Pluma;
