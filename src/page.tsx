import { useState } from "react";
import Users from "./pages/FormularioUser/users";
import ListaUsuarios from "./pages/FormularioUser/listauser";
import "bootstrap/dist/css/bootstrap.min.css";
import "../reset.css";

const App = () => {
  const [mostrarLista, setMostrarLista] = useState(false);

  return (
    <div className="container mt-4">
      <h1>Cadastro de Usuários</h1>
      <Users />
      <hr />
      <button className="btn btn-secondary" onClick={() => setMostrarLista(!mostrarLista)}>
        {mostrarLista ? "Ocultar Lista de Usuários" : "Mostrar Lista de Usuários"}
      </button>

      {mostrarLista && <ListaUsuarios />}
    </div>
  );
};

export default App;
