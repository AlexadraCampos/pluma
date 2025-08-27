import { Await } from "react-router-dom";
import "../css/cadastro.css";
import api from "../services/api";
import { useEffect, useState, useRef } from "react";


function Cadastro() {

  const [users, setUsers] = useState([]);
  
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });
     
  }


   async function getUsers() {

    const usersFromApi = await api.get('/users');
    setUsers(usersFromApi.data)
    
  };

  useEffect(() => {
    getUsers()
  }, []);

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
  }

  // #parte html 
  return (
    <div className="container-cad">
      <form className="form-cad">
        <h1 className="text-form">Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName}></input>
        <input placeholder="Idade" name="age" type="number" ref={inputAge}></input>
        <input placeholder="email" name="email" type="email" ref={inputEmail}></input>
        <button type="button" onClick={createUsers} >Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id}>
          <ul className="card-cad ">
            <h2>Usuários Cadastrados</h2>
            <p>Nome:  {user.name} </p>
            <p>Idade: {user.age} </p>
            <p>Email: {user.email} </p>
            <button onClick={() => deleteUsers(user.id)} type="button" className="icon-delete">
              <img
                src="https://img.icons8.com/?size=100&id=TIoH8Dbt0cSQ&format=png&color=000000"
              />
            </button>
          </ul>
        </div>
      ))};
      
    </div>
  );
}


export default Cadastro;