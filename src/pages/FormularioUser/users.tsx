import { useState } from "react";
import { useEffect, } from "react";
import "./Users.css"
import "bootstrap/dist/css/bootstrap.min.css";

interface FormularioUsers {
  name: string;
  email: string;
  telefone: number;
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
        index === editando ? {name,email,telefone}: item
      ))
      setDadosCadastro(updateDados)
      setEditando(null)
    } else{
    setDadosCadastro([...dadosCadastro, {name,email,telefone}]);
  };
    setName("");

    console.log(dadosCadastro)
}
  const editar = (index:number) => {

    const item = dadosCadastro[index]
    setName(item.name)
    setEditando(index)

  }

  const apagar = (index:number) => {
    const apagando = [...dadosCadastro]
    apagando.splice(index,1)
    setDadosCadastro(apagando)

  }
  return (
    <>

      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Name</label>
            <input type="name" className="form-control" id="inputEmail4" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Name" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="inputEmail4">Telefone</label>
            <input type="number" className="form-control" id="inputEmail4" placeholder="Name" value={telefone} onChange={(e) => setTelefone(Number(e.target.value))}/>
          </div>
        </div>
        <button className="btn btn-primary" onClick={tableDados} >{editando !== null ? "Atualizar" : "Gravar"}</button>
      </div>
    </>
  );
};

export default Users;
