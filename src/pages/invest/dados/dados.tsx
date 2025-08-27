import { useState } from "react"
import "./dados.css"
import Link from "next/link";

interface ProdutoProps{
    produto: string
    valor: number
}

const Dados = ({produto,valor} : ProdutoProps) =>{
    const [form, setForm] = useState({
    produto: "",
    valor: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produto cadastrado:", form);
    alert(`Produto "${form.produto}" no valor de R$ ${form.valor} cadastrado!`);
    setForm({ produto: "", valor: "" }); // limpa
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Cadastro de Produto</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Produto</label>
            <input
              type="text"
              name="produto"
              value={form.produto}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Valor (R$)</label>
            <input
              type="number"
              name="valor"
              value={form.valor}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Cadastrar</button>
          <Link href={"../invest"}>Home</Link>
        </form>
      </div>
    </main>
  );
}


export default Dados