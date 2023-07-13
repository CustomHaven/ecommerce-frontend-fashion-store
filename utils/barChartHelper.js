import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Sales Chart",
      padding: 40
    }
  },
  scaleShowValues: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value, index) {
          return index !== 0 ? "$" +  value : value;
        },
        autoSkip: false
      }
    },
    x: {
      ticks: {
          autoSkip: false
      }
    }
  }
};

export const monthLabels = new Array(12).fill(0).map((v, i) => new Date(`2023-${i+1}-01`).toLocaleString("en-UK", { month: "long" }));
export const weekdayLabels = new Array(7).fill(0).map((v, i) => new Date(`2023-05-${i+1}`).toLocaleString("en-UK", { weekday: "long" } ));