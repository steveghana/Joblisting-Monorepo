// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //

import ReactApexChart from "react-apexcharts";
export enum ChartCurve {
  smooth = "smooth",
  // straight = "straight",
}
const chartData = {
  chart: {
    type: "line",
  },
  height: 95,
  options: {
    chart: {
      id: "support-chart",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      // curve: ChartCurve,
      width: 1,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      // y: {
      //   title: 'Ticket '
      // },
      marker: {
        show: false,
      },
    },
  },
  series: [
    {
      data: [0, 15, 10, 50, 30, 40, 25],
    },
  ],
};

export default chartData;
