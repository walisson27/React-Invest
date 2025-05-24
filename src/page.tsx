import { useState } from "react";
import { DarkModeProvider } from "./Contexte/Context";
import ModeDark from "./pages/Darkmode/ModeDark";
import Users from "./pages/FormularioUser/users";
import ListaUsuarios from "./pages/FormularioUser/listauser";
import "bootstrap/dist/css/bootstrap.min.css";
import "../reset.css";
import "./index.css";
const App = () => {
  const [mostrarLista, setMostrarLista] = useState(false);

  return (
     <DarkModeProvider>
    <div className="container mt-4">
      <ModeDark/>
      <h1>Cadastro de Usuários</h1>
      <Users />
      <hr />
      <button className="btn btn-secondary" onClick={() => setMostrarLista(!mostrarLista)}>
        {mostrarLista ? "Ocultar Lista de Usuários" : "Mostrar Lista de Usuários"}
      </button>

      {mostrarLista && <ListaUsuarios />}
      
    </div>
    </DarkModeProvider>
  );
};

export default App;
