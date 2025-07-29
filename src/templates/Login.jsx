import "../css/login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Envio");

    if (username && password) {
        console.log("Login bem-sucedido");
        navigate("/Pluma");
    } else {
        alert("Por favor Preencha todos os campos");
    }
  };

  return (
    <div className="container">
      <div className="Login">
        {/* Lado esquerdo - logo + slogan */}
        <div className="login-banner">
          <img
            src="icon_pluma.png"
            alt="Logo da Pluma"
            className="banner-logo"
          />
          <p className="banner-text">
            Web Pluma, você pode pesquisar sobre pássaros de forma rápida e fácil!
          </p>
        </div>

        {/* Lado direito - formulário */}
        <form onSubmit={handleSubmit}>
          <h1>Bem-vindo ao Pluma</h1>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembrar de mim
            </label>
            <a href="#">Esqueceu a senha?</a>
          </div>

          <button>
             Entrar
          </button>

          <div className="signup-link">
            <p>
              Não tem conta? <a href="#">Registrar</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
