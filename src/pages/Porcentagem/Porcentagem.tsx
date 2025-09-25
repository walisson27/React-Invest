import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

const Porcentagem = () => {
  const valorFixo = 500; 
  const [itens, setItens] = useState<{ nome: string; valor: number }[]>([]);
  const [valor, setValor] = useState<number>(0)
  const [novoNome, setNovoNome] = useState("");
  const [entrada, setEntrada] = useState<number>(0);
  const [modo, setModo] = useState<"valor" | "porcentagem">("valor"); 

  useEffect(() =>{
    const dadosItens = localStorage.getItem("itens")
    if(dadosItens) {
      setItens(JSON.parse(dadosItens))
    }
    const valorItem = localStorage.getItem("valor")
    if(valorItem) {
      setValor(Number(valorItem))
    }
  },[])

  useEffect(() =>{
    localStorage.setItem("itens",JSON.stringify(itens))
  },[itens,])

  useEffect(() =>{
    localStorage.setItem("valor",String(valor))
  },[valor])

  // soma dos valores já usados
  const somaValores = itens.reduce((a, b) => a + b.valor, 0);
  const restanteValor = somaValores < valor ? valor - somaValores : 0;

  const data = {
    labels: [...itens.map((item) => `${item.nome} R$${item.valor} (${((item.valor / valor) * 100).toFixed(0)}%)`), "Restante"],
    datasets: [
      {
        data: [...itens.map((item) => item.valor), restanteValor],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(201, 203, 207, 0.7)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataset = context.dataset.data;
            const value = dataset[context.dataIndex];
            const percentage = ((value / valor) * 100).toFixed(1) + "%";
            return `${context.label}: R$ ${value.toFixed(2)} (${percentage})`;
          },
        },
      },
    },
  };

  const adicionarItem = () => {
    if (!novoNome.trim() || entrada <= 0) return;

    // converte se for porcentagem
    const valorFinal = modo === "porcentagem" ? (valor * entrada) / 100 : entrada;

    if (somaValores + valorFinal > valor) {
      alert("A soma dos valores não pode ultrapassar R$ " + valor);
      return;
    }

    setItens([...itens, { nome: novoNome, valor: valorFinal }]);
    setNovoNome("");
    setEntrada(0);
  };

  const limpaItem = (id:number) => {
    const novaLista = itens.filter((algo,indiceAtual)=> indiceAtual !== id
        );
    setItens(novaLista)
    localStorage.setItem("itens",JSON.stringify(novaLista)) 
 }

  return (
    <div className="porcentagem">
      <nav className="nav-invest">
        <ul className="active">
          <li><Link href={"../invest/invest"}>Sair</Link></li>
        </ul>
    </nav>
    <div style={{ width: "420px", margin: "20px auto" }}>
      <h2 className="h2-invest">Controle de Gastos</h2>
      <p className="p-porcentagem">Valor fixo: R$ {valor}</p>
      <p className="p-porcentagem">Total usado: R$ {somaValores} / R$ {valor}</p>

      <section className="section-porcentagem" style={{ marginBottom: "10px" }}>
        <input type="number" 
        className="input-porcentagem"
        value={valor} 
        onChange={(e) => setValor(Number(e.target.value))} 
        placeholder="Valor fixo" />
        <input
          type="text"
          className="input-porcentagem"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="number"
          className="input-porcentagem"
          value={entrada}
          onChange={(e) => setEntrada(Number(e.target.value))}
          placeholder={modo === "valor" ? "Valor (R$)" : "Porcentagem (%)"}
        />
        <select className="select-modern" value={modo} onChange={(e) => setModo(e.target.value as "valor" | "porcentagem")}>
          <option value="valor">Valor (R$)</option>
          <option value="porcentagem">Porcentagem (%)</option>
        </select>
        <button className="btn-modern" onClick={adicionarItem}>Adicionar</button>
      </section>

      <div className="grafico-porcentagem">
        <Doughnut data={data} options={options} />
      </div>

      <ul className="ul-porcentagem">
        {itens.map((item, index) => (
          <li className="li-porcentagem" key={index}>
            {item.nome}: R$ {item.valor.toFixed(2)} → {((item.valor / valor) * 100).toFixed(1)}%
            <button className="btn-modern" onClick={() =>limpaItem(index)}>Limpar</button>
          </li>
        ))}
      </ul>
    </div>
   </div>
  );
};

export default Porcentagem;
