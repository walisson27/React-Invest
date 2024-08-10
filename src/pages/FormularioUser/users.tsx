import { useState } from "react";

interface FormularioUsers {
  name: string;
  fullName: string;
  telefone: number;
  rg: number;
  endereco: string;
  carro: string;
  placa: string;
}

const Users = () => {
  const [name, setName] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [carro, setCarro] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [telefone, setTelefone] = useState<number | undefined>(undefined);
  const [rg, setRg] = useState<number | undefined>(undefined);

 const [dadosCadastro, setDadosCadastro] = useState<FormularioUsers[]>([]);
 const [editando, setEditando] = useState<number | null>(null)


 const tableDados = () => {
    if( editando !== null) {
      const updateDados = dadosCadastro.map((item, index) => (
        index === editando ? {name,carro,fullName,endereco,placa,telefone,rg} : item
      ))
      setDadosCadastro(updateDados)
      setEditando(null)
    } else{
    setDadosCadastro([...dadosCadastro, {name,carro,fullName,endereco,placa,telefone,rg}]);
  };
    setName("");
    setCarro("");
    setFullName("");
    setEndereco("");
    setCarro("");
    setPlaca("");
    console.log(dadosCadastro)
}
  const editar = (index:number) => {

    const item = dadosCadastro[index]
    setName(item.name)
    setCarro(item.carro)
    setFullName(item.fullName)
    setPlaca(item.placa)
    setEditando(index)

  }

  const apagar = (index:number) => {
    const apagando = [...dadosCadastro]
    apagando.splice(index,1)
    setDadosCadastro(apagando)

  }
  return (
    <>
      <section>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="number"
          placeholder="RG"
          value={rg !== undefined ? rg : ""}
          onChange={(e) => setRg(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone !== undefined ? telefone : ""}
          onChange={(e) => setTelefone(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
        <input
          type="text"
          placeholder="Carro"
          value={carro}
          onChange={(e) => setCarro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
        <button onClick={tableDados}>{editando !== null ? "Atualizar" : "Gravar"}</button>
      </section>
    </>
  );
};

export default Users;
