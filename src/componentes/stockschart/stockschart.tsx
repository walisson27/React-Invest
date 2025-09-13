import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StocksChart() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/bolsa");
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("Nenhum dado histórico encontrado.");
          setChartData(null);
          return;
        }

        const validResults = data.filter(r => r.history && r.history.length > 0);
        if (validResults.length === 0) {
          console.warn("Nenhum histórico válido disponível.");
          setChartData(null);
          return;
        }

        const labels = validResults[0].history.map((d: any) => d.date);
        const datasets = validResults.map((r: any, idx: number) => {
          const prices = r.history.map((h: any) => Number(h.close ?? h.close_price ?? h.adjclose ?? 0));
          const colors = ["#3e95cd", "#8e5ea2", "#3cba9f"];
          return {
            label: r.symbol || `Ticker ${idx}`,
            data: prices,
            fill: false,
            borderColor: colors[idx % colors.length],
            borderWidth: 2,
            tension: 0.15
          };
        });

        setChartData({ labels, datasets });
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Carregando gráfico...</div>;
  if (!chartData)
    return (
      <div>
        Não foi possível carregar os dados do gráfico.{" "}
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Histórico (fechamento) — PETR4 · VALE3 · ITUB4" },
      tooltip: { mode: "index", intersect: false }
    },
    interaction: { mode: "nearest", intersect: false },
    scales: {
      x: { display: true, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 } },
      y: { display: true, title: { display: true, text: "Preço (R$)" }, ticks: { beginAtZero: false } }
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "2rem auto", padding: "1rem" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
