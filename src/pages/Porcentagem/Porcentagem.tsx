import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);



const Porcentagem = () =>{
  const data = {
    labels: ["React", "Vue", "Angular", "Svelte"],
    datasets: [
      {
        data: [40, 25, 20, 15], // valores brutos
        backgroundColor: ["#2563eb", "#22c55e", "#f97316", "#ec4899"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataset = context.dataset;
            const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
            const value = dataset.data[context.dataIndex];
            const percentage = ((value / total) * 100).toFixed(1) + "%";
            return `${context.label}: ${percentage}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-96 mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Frameworks (%)</h2>
      <Pie data={data} options={options} />
    </div>
  );
};


export default Porcentagem