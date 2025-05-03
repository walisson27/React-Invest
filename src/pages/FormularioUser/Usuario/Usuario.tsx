import React from "react";
import "./users.css";

interface FormularioUsers {
  name: string;
  email: string;
  telefone: number;
}

interface Props {
  usuario: FormularioUsers;
  setUsuario: React.Dispatch<React.SetStateAction<FormularioUsers>>;
}

const Usuario = ({ usuario, setUsuario }: Props) => {

  return (
    <div>
      <div className="usuario-ajuste">
        <div className="form-group col-md-6">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Nome"
            value={usuario.name}
            onChange={(e) => setUsuario({...usuario, name: e.target.value})}
          />

          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            value={usuario.email}
            onChange={(e) => setUsuario({...usuario, email: e.target.value})}
          />

          <label htmlFor="inputTelefone">Telefone</label>
          <input
            type="number"
            className="form-control"
            id="inputTelefone"
            placeholder="Telefone"
            value={usuario.telefone ?? ""}
            onChange={(e) => setUsuario({...usuario, telefone: Number(e.target.value)})}
          />
        </div>
      </div>
    </div>
  );
};

export default Usuario;
