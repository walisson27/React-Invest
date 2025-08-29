// src/components/graficos/Graficos.tsx
import { Bar, Pie } from "react-chartjs-2";

interface GraficosProps {
  data: any;
  options?: any;
}

const Graficos = ({ data, options }: GraficosProps) => {
  return (
    <div className="graficos-container">
      <section className="current-invest">
        <h2 className="h2-invest">Gráfico em Barras</h2>
        <Bar data={data} options={options} />
      </section>

      <section className="categories-invest">
        <h2 className="h2-invest">Gráfico em Pizza</h2>
        <Pie data={data} />
      </section>
    </div>
  );
};

export default Graficos;
