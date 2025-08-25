import "../css/cadastro.css";

function Cadastro() {
  const users = [
    {
      id: "12345",
      name: "fulando",
      age: 30,
      email: "fulano@gmail.com",
    },
    {
      id: "56789",
      name: "fulando2",
      age: 27,
      email: "fulano23@gmail.com",
    },
  ];

  return (
    <div className="container-cad">
      <form className="form-cad">
        <h1 className="text-form">Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text"></input>
        <input placeholder="Idade" name="age" type="number"></input>
        <input placeholder="email" name="email" type="email"></input>
        <button type="button">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id}>
          <ul className="card-cad ">
            <h2>Usuários Cadastrados</h2>
            <p>Nome:  {user.name} </p>
            <p>Idade: {user.age} </p>
            <p>Email: {user.email} </p>
            <button type="button" className="icon-delete">
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