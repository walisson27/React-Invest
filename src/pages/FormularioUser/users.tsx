import { useState } from "react";
import { useEffect, } from "react";
import "./Users.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Endereço from "./Endereço.tsx/Endereço";


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
 /* fullName: string;
  telefone: number;
  rg: number;
  endereco: string;
  carro: string;
  placa: string;*/
}

const Users = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<number | undefined>(undefined);
  /*const [fullName, setFullName] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [carro, setCarro] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [telefone, setTelefone] = useState<number | undefined>(undefined);
  const [rg, setRg] = useState<number | undefined>(undefined);*/

 const [dadosCadastro, setDadosCadastro] = useState<FormularioUsers[]>([]);
 const [editando, setEditando] = useState<number | null>(null)

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
    if( editando !== null) {
      const updateDados = dadosCadastro.map((item, index) => (
        index === editando ? {name,email,telefone,endereco}: item
      ))
      setDadosCadastro(updateDados)
      setEditando(null)
    } else{
    setDadosCadastro([...dadosCadastro, {name,email,telefone,endereco}]);
  };
    setName("");

    console.log(dadosCadastro)
}

  return (
    <>
      <div>
        <div className="form-row  ">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Name</label>
            <input type="name" className="form-control" id="inputEmail4" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Name" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="inputEmail4">Telefone</label>
            <input type="number" className="form-control" id="inputEmail4" placeholder="Name" value={telefone} onChange={(e) => setTelefone(Number(e.target.value))}/>
            <Endereço endereco={endereco} setEndereco={setEndereco}/>
          </div>
        </div>
        <button className="btn btn-primary" onClick={tableDados} >{editando !== null ? "Atualizar" : "Gravar"}</button>
      </div>
    </>
  );
};

export default Users;
