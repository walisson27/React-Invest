import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Endereço from "../FormularioUser/Endereço.tsx/Endereço";
import Usuario from "./Usuario/Usuario";

interface EnderecoProps {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  pontoReferencia: string;
}

interface FormularioUsers {
  name: string;
  email: string;
  telefone: number;
  endereco: EnderecoProps;
}

const Users = () => {
  const [dadosCadastro, setDadosCadastro] = useState<FormularioUsers[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  const [endereco, setEndereco] = useState<EnderecoProps>({
    rua: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    complemento: '',
    pontoReferencia: '',
  });

  const [usuario, setUsuario] = useState<Omit<FormularioUsers, "endereco">>({
    name: '',
    telefone: 0,
    email: '',
  });

  // Carregar dados do LocalStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuarios");
    if (dadosSalvos) {
      setDadosCadastro(JSON.parse(dadosSalvos));
    }
  }, []);

  // Salvar no LocalStorage sempre que os dados forem alterados
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(dadosCadastro));
  }, [dadosCadastro]);

  const tableDados = () => {
    const novoUsuario: FormularioUsers = {
      ...usuario,
      endereco,
    };

    if (editando !== null) {
      const updateDados = dadosCadastro.map((item, index) =>
        index === editando ? novoUsuario : item
      );
      setDadosCadastro(updateDados);
      setEditando(null);
    } else {
      setDadosCadastro([...dadosCadastro, novoUsuario]);
    }

    console.log(dadosCadastro);
  }

  return (
    <>
      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <Usuario usuario={usuario} setUsuario={setUsuario} />
            <Endereço endereco={endereco} setEndereco={setEndereco} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={tableDados}>
          {editando !== null ? "Atualizar" : "Gravar"}
        </button>
      </div>
    </>
  );
};

export default Users;
