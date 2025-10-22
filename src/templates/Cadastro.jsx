import "../css/cadastro.css";
import api from "../services/api";
import { useEffect, useState, useRef } from "react";

function Cadastro() {
  const [users, setUsers] = useState([]);
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function createUsers() {
    try {
      await api.post("/usuarios/Cadastro", {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      });

      alert("✅ Usuário cadastrado com sucesso!");
      getUsers();

      inputEmail.current.value = "";
      inputPassword.current.value = "";
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao cadastrar usuário.");
    }
  }

  async function getUsers() {
    try {
      const response = await api.get("/usuarios");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function deleteUsers(email) {
    try {
      await api.delete(`/usuarios/${email}`);
      alert("🗑 Usuário deletado com sucesso!");
      getUsers();
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao deletar usuário.");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container-cad">
      <form className="form-cad">
        <h1 className="text-form">Cadastro de Usuários</h1>
        <input placeholder="Email" type="email" ref={inputEmail} />
        <input placeholder="Senha" type="password" ref={inputPassword} />

        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user._id}>
          <ul className="card-cad">
            <h2>Usuários Cadastrados</h2>
            <p>Email: {user.email}</p>
            <button
              onClick={() => deleteUsers(user.email)}
              type="button"
              className="icon-delete"
            >
              <img src="https://img.icons8.com/?size=100&id=TIoH8Dbt0cSQ&format=png&color=000000" />
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Cadastro;
