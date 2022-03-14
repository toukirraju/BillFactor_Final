import React from "react";
import "chart.js/auto";

import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSelector } from "react-redux";

const PieChart = () => {
  const { apartmentWidgets, renterWidgets, billWidgets, isPending } =
    useSelector((state) => state.dashboardData);
  // console.log(billWidgets);
  return (
    <>
      <div style={{ height: "300px" }}>
        <Chart
          type="pie"
          data={{
            labels: ["Payable", "Paid", "Remaining"],
            datasets: [
              {
                label: "Dataset 1",
                data: [
                  billWidgets.totalPayable,
                  billWidgets.totalPaidBill,
                  billWidgets.remainingBill,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 3,
              },
            ],
          }}
          plugins={[ChartDataLabels]}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                labels: {
                  color: "white",
                  font: {
                    size: 12,
                  },
                },
              },
              datalabels: {
                color: "white",
                labels: {
                  title: {
                    font: {
                      weight: "bold",
                    },
                  },
                },
                formatter: function (value, context) {
                  return value + " /-";
                },
                // formatter: function (value, context) {
                //   return (
                //     context.chart.data.labels[context.dataIndex] + ":" + value
                //   );
                // },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PieChart;
