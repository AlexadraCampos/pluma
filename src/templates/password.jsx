import { useState } from "react";
import "../css/resetpassword.css";
import api from "../services/api";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
  
    async function handleResetPassword() {
      if (!email || !newPassword) {
        setMessage("⚠️ Preencha todos os campos.");
        return;
      }
  
      try {
        const response = await api.put("/usuarios/password", { email, newPassword });
        setMessage(`✅ ${response.data.message}`);
        setEmail("");
        setNewPassword("");
      } catch (error) {
        console.error(error);
        setMessage(
          `❌ ${error.response?.data?.message || "Erro ao redefinir a senha."}`
        );
      }
    }
  
    return (
      <div className="container-reset">
        <form className="form-reset">
          <h1>Redefinir Senha</h1>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite a nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="button" onClick={handleResetPassword}>
            Redefinir
          </button>
          {message && <p className="alert-reset">{message}</p>}
        </form>
      </div>
    );
  }
  
  export default ResetPassword;