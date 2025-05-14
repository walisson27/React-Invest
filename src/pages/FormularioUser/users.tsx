import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Endereço from "../FormularioUser/Endereço.tsx/Endereço";
import Usuario from "./Usuario/Usuario";
import DateInput from "./data";
import { FormularioUsers,EnderecoProps } from "./Types/Types";
import "./Formulario.css"
import Data from "./Data/data";

const Users = () => {
  const [dadosCadastro, setDadosCadastro] = useState<FormularioUsers[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  const [dataCadastro,setDataCadastro] = useState<string>('');
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

  const [usuario, setUsuario] = useState<Omit<FormularioUsers, "endereco" | "dataCadastro">>({
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
      dataCadastro,
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
      <div className="form-row formulario-ajuste">
          <div className="form-group col-md-7">
            <Data/>
            <Usuario usuario={usuario} setUsuario={setUsuario} />
            <Endereço endereco={endereco} setEndereco={setEndereco} />
          <DateInput label="Data" value={dataCadastro} onDateChange={setDataCadastro} />
          </div>

        <button className="btn btn-primary" onClick={tableDados}>
          {editando !== null ? "Atualizar" : "Gravar"}
        </button>
      </div>
    </>
  );
};

export default Users;
