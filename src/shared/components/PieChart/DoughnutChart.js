import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import style from "./DoughnutChart.module.scss";
import { OTHERS } from "../../constants/common";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
  const data = {
    labels: props.data.label,
    datasets: [
      {
        label: "Votes",
        data: props.data.value,
        backgroundColor: [
          "#3948AB",
          "#4CAF50",
          "#F765A3",
          "#16BFD6",
          "rgba(255, 159, 64)",
        ],
        borderColor: [
          "#3948AB",
          "#4CAF50",
          "#F765A3",
          "#16BFD6",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className={style.chart__container}>
      <p>{props.data.question}</p>
      <hr className={style.chart__divider} />
      <Doughnut className={style.chart__pie} data={data} options={options} />
      {props.data.showAverage && (
        <span className={`${style.chart__average}`}>
          {OTHERS.AVERAGE}:{" "}
          {(
            props.data.value.reduce(
              (sum, currentValue) => sum + currentValue,
              0
            ) / props.data.value.length
          ).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default DoughnutChart;
