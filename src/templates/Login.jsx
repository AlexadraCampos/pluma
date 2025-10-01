import "../css/login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(""); 
  const [errorSenha, setErrorSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorEmail("");
    setErrorSenha("");

    try {
      const response = await api.post("/usuarios/login", { email, password });
    
      if (response.status === 200) {
        navigate("/pluma");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    
      if (error.response) {
        const msg = error.response.data?.message || "";
    
        if (msg.includes("E-mail")) {
          setErrorEmail("E-mail não cadastrado");
        } else if (msg.includes("senha")) {
          setErrorSenha("A senha que você inseriu está incorreta.");
        } else {
          setErrorEmail("Erro ao fazer login. Verifique os dados.");
        }
      } else {
        setErrorEmail("Não foi possível conectar ao servidor.");
      }
    }
  }
    
  return (
    <div className="container-login">
      <div className="Login">
        {/* Lado esquerdo - logo + slogan */}
        <div className="login-banner">
          <img src="/pluma.png" alt="Logo da Pluma" className="banner-logo" />
          <p className="banner-text">
            Web Pluma, você pode pesquisar sobre pássaros de forma rápida e
            fácil!
          </p>
        </div>

        {/* Lado direito - formulário */}
        <form onSubmit={handleSubmit}>
          <h1>Bem-vindo ao Pluma</h1>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errorEmail ? "input-error" : ""}
            />
         

            <FaUser className="icon" />
            {errorEmail && <p className="error-message">{errorEmail}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errorSenha ? "input-error" : ""}
            />

            <FaLock className="icon" />
            {errorSenha && <p className="error-message">{errorSenha}</p>}
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembrar de mim
            </label>

            <Link to="/password">Esqueceu a senha?</Link>
          </div>

          <button>Entrar</button>

          <div className="signup-link">
            <p>
              Não tem conta? <Link to="/cadastro">Registrar</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
