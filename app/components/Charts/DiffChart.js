import { Chart } from "react-google-charts";
function DiffChart({ data = [], heading = "" }) {
  const options = {
    title: heading,
    backgroundColor: "transparent", // Set the background color
    chartArea: { backgroundColor: "transparent" }, // Set the chart area background color
    titleTextStyle: {
      color: "#333", // Title text color
    },
    hAxis: {
      textStyle: { color: "#555" }, // Horizontal axis text color
      gridlines: { count: 1 },
    },
    vAxis: {
      textStyle: { color: "#555" }, // Vertical axis text color
      gridlines: { count: 0 },
    },
    colors: [
      "#2A9D8F",
      "#264653",
      "#F4A261",
      "#E76F51",
      "#FFB703",
      "#4D908E",
      "#9A79BE",
      "#F0F3BD",
      "#E63946",
      "#A8DADC",
      "#457B9D",
      "#1D3557",
      "#D9A5B3",
      "#D4A373",
      "#8AB17D",
    ],
    chartArea: { width: "50%" },
    diff: {
      oldData: {
        color: "#f4a261", // Custom color for the "Previous" data bar
        widthFactor: 0.8,
      },
      newData: {
        color: "#2A9D8F", // Custom color for the "Current" data bar
        widthFactor: 0.5,
      },
    },
  };
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      diffdata={data}
      options={options}
    />
  );
}

export default DiffChart;
