import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

const Porcentagem = () => {
  const valorFixo = 500; 
  const [itens, setItens] = useState<{ nome: string; porcentagem: number }[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [novaPorcentagem, setNovaPorcentagem] = useState<number>(0);
  const [valor, setValor] = useState<number>(0)

  //porcentagem
  const somaPercentual = itens.reduce((a, b) => a + b.porcentagem, 0);
  const restantePercentual = somaPercentual < 100 ? 100 - somaPercentual : 0;

  // converter porcentagem para valor em cima do fixo
  const valoresConvertidos = itens.map((item) => (valor * item.porcentagem) / 100);
  const restanteValor = (valor * restantePercentual) / 100;

  const data = {
    labels: [...itens.map((item) => `${item.nome} (${item.porcentagem}%) `) , `Restante (${restantePercentual}%)`],
    datasets: [
      {
        data: [...valoresConvertidos, restanteValor],
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
            return `${context.label}: R$ ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  const adicionarItem = () => {
    if (!novoNome.trim() || novaPorcentagem <= 0) return;
    if (somaPercentual + novaPorcentagem > 100) {
      alert("A soma das porcentagens não pode ultrapassar 100%");
      return;
    }
    setItens([...itens, { nome: novoNome, porcentagem: novaPorcentagem }]);
    setNovoNome("");
    setNovaPorcentagem(0);
  };

  return (
    <>
    <nav className="nav-invest">
        <ul>
          <li><Link href={"../invest/invest"}>Sair</Link></li>
        </ul>
    </nav>
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h2>Controle de Gastos</h2>
      <p>Valor fixo: R$ {valor}</p>
      <p>Porcentagem usada: {somaPercentual}%</p>

      <input
          type="number"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          placeholder="Valor"
        />
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="number"
          value={novaPorcentagem}
          onChange={(e) => setNovaPorcentagem(Number(e.target.value))}
          placeholder="%"
        />
        <button onClick={adicionarItem}>Adicionar</button>
      </div>

      <div style={{ height: "400px" }}>
        <Doughnut data={data} options={options} />
      </div>

      <ul>
        {itens.map((item, i) => (
          <li key={i}>
            {item.nome}: {item.porcentagem}% → R$ {(valor * item.porcentagem / 100).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default Porcentagem;
