import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Porcentagem = () => {
  const valorMaximo = 100;
  const [itens, setItens] = useState<{ nome: string; valor: number }[]>([]); 
  const [novoValor, setNovoValor] = useState<number>(0);
  const [novoNome, setNovoNome] = useState<string>("");

  // soma atual
  const soma = itens.reduce((a, b) => a + b.valor, 0);
  const restante = valorMaximo - soma > 0 ? valorMaximo - soma : 0;

  const data = {
    labels: [...itens.map((item) => item.nome), "Restante"],
    datasets: [
      {
        data: [...itens.map((item) => item.valor), restante],
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
            const total = valorMaximo;
            const value = dataset[context.dataIndex];
            const percentage = ((value / total) * 100).toFixed(1) + "%";
            return `${context.label}: ${value} (${percentage})`;
          },
        },
      },
    },
  };

  const adicionarItem = () => {
    if (novoValor <= 0 || !novoNome.trim()) return;
    if (soma + novoValor > valorMaximo) {
      alert("Não pode ultrapassar o valor máximo de " + valorMaximo);
      return;
    }
    setItens([...itens, { nome: novoNome, valor: novoValor }]);
    setNovoValor(0);
    setNovoNome("");
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h2>Controle de Porcentagem</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="number"
          value={novoValor}
          onChange={(e) => setNovoValor(Number(e.target.value))}
          placeholder="Valor"
        />
        <button onClick={adicionarItem}>Adicionar</button>
      </div>

      <p>Total usado: {soma} / {valorMaximo}</p>

      <div style={{ height: "400px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default Porcentagem;
