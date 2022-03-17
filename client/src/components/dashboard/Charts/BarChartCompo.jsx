import React, { useEffect } from "react";
import "chart.js/auto";
import DatePicker from "react-datepicker";

import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useDispatch, useSelector } from "react-redux";
import { getYearlyBills } from "../../../redux/slices/dashboardSlice";

const BarChartCompo = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = React.useState(new Date());
  const {
    apartmentWidgets,
    renterWidgets,
    billWidgets,
    yearlyBills,
    isPending,
  } = useSelector((state) => state.dashboardData);
  const year = startDate.getFullYear();

  useEffect(() => {
    dispatch(getYearlyBills(year));
  }, [dispatch]);
  return (
    <>
      <div className="input-container">
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMM d, yyyy h:mm aa"
            showYearPicker
          />
        </div>
        <div>
          <button
            className="btn btn-outline-primary"
            onClick={() => dispatch(getYearlyBills(year))}
            disabled={isPending}
          >
            &#x1F50E;
          </button>
        </div>
      </div>
      <div style={{ height: "400px" }}>
        <Bar
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: ["Total"],
                data: [
                  yearlyBills.January,
                  yearlyBills.February,
                  yearlyBills.March,
                  yearlyBills.April,
                  yearlyBills.May,
                  yearlyBills.June,
                  yearlyBills.July,
                  yearlyBills.August,
                  yearlyBills.September,
                  yearlyBills.October,
                  yearlyBills.November,
                  yearlyBills.December,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(144, 70, 39, 0.2)",
                  "rgba(204, 201, 51, 0.2)",
                  "rgba(20, 235, 173, 0.2)",
                  "rgba(155, 100, 149, 0.2)",
                  "rgba(66, 252, 158, 0.2)",
                  "rgba(195, 52, 120, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(144, 70, 39, 1)",
                  "rgba(204, 201, 51, 1)",
                  "rgba(20, 235, 173, 1)",
                  "rgba(155, 100, 149, 1)",
                  "rgba(66, 252, 158, 1)",
                  "rgba(195, 52, 120, 1)",
                ],
                borderWidth: 3,
              },
            ],
          }}
          height={400}
          width={600}
          plugins={[ChartDataLabels]}
          options={{
            maintainAspectRatio: false,
            responsive: true,
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
                anchor: "end",
                align: "top",
                rotation: -45,
                // display: function (context) {
                //   return context.dataIndex % 2;
                // },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default BarChartCompo;
