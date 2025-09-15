import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../reset.css"
import "./index.css";
const App = () => {
  const [mostrarLista, setMostrarLista] = useState(false);

  return (
    <div className="container mt-4">
      <h1>Cadastro de Usuários</h1>
      <hr />
      <button className="btn btn-secondary" onClick={() => setMostrarLista(!mostrarLista)}>
        {mostrarLista ? "Ocultar Lista de Usuários" : "Mostrar Lista de Usuários"}
      </button>      
    </div>
  );
};

export default App;
