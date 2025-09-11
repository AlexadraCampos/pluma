import { Await } from "react-router-dom";
import "../css/cadastro.css";
import api from "../services/api";
import { useEffect, useState, useRef } from "react";
import { CgPassword } from "react-icons/cg";

function Cadastro() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function createUsers() {
    try {
      await api.post("users/cadastro", {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      });

      alert("✅ Usuário cadastrado com sucesso!");

      getUsers();

      // Limpa os campos
      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";
      inputPassword.current.value = "";
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao cadastrar usuário.");
    }
  }

  async function getUsers() {
    const usersFromApi = await api.get("/users");
    setUsers(usersFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUsers(id) {
    try {
      await api.delete(`/users/${id}`);
      alert("🗑️ Usuário deletado com sucesso!");
      getUsers(); // Atualiza a lista após deletar
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao deletar usuário.");
    }
  }

  // #parte front
  return (
    <div className="container-cad">
      <form className="form-cad">
        <h1 className="text-form">Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName}></input>
        <input placeholder="Idade" name="age" type="number" ref={inputAge}></input>
        <input placeholder="email" name="email" type="email" ref={inputEmail}></input>
        <input placeholder="Senha"  name="password" type="password" ref={inputPassword}></input>

        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id}>
          <ul className="card-cad ">
            <h2>Usuários Cadastrados</h2>
            <p>Nome: {user.name} </p>
            <p>Idade: {user.age} </p>
            <p>Email: {user.email} </p>
            <p>Senha: {user.password}</p>
            <button
              onClick={() => deleteUsers(user.id)}
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
