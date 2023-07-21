import React from "react";
import { Box, Paper, TableContainer } from "@mui/material";
import Highcharts, { Options as HighchartsOptions } from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
import { HeatmapProps } from "./Heatmap.props";

export const HighchartsWidget = (props: HeatmapProps) => {
  const { tableData, tableHeaders } = props;
  HighchartsHeatmap(Highcharts);

  const xAxisCategories = tableHeaders.filter((_value, index) => index !== 0);

  const yAxisCategories = tableData
    .map((rowData) => rowData.filter((_value, index) => index === 0))
    .flat() as string[];

  const numericData = tableData.map((row) =>
    row.filter((_value, index) => index !== 0)
  );

  const heatmapData = numericData
    .map((rowData, rowIndex) =>
      rowData.map((cellData, columnIndex) => [columnIndex, rowIndex, cellData])
    )
    .flat();

  const options: HighchartsOptions = {
    chart: {
      type: "heatmap",
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories: xAxisCategories,
      opposite: true,
    },
    yAxis: {
      categories: yAxisCategories,
      title: undefined,
      reversed: true,
    },

    colorAxis: {
      stops: getColorStops(),
    },
    legend: getLegendConfig(),
    tooltip: {
      format: getTooltipText(),
    },
    series: [
      {
        type: "heatmap",
        borderWidth: 0.5,
        borderColor: "white",
        dataLabels: {
          enabled: false,
        },
        data: heatmapData,
      },
    ],
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </TableContainer>
    </Box>
  );
};

const getTooltipText =
  (): string => `<b>{series.xAxis.categories.(point.x)}</b><br>
<b>{series.yAxis.categories.(point.y)}</b><br>
<b>{point.value}</b>`;

const getColorStops = (): [number, string][] => [
  [0, "#FFFFFF"],
  [0.5, "#FF2B00"],
  [1, "#000000"],
];

const getLegendConfig = (): Highcharts.LegendOptions => ({
  align: "right",
  layout: "vertical",
  margin: 40,
  verticalAlign: "middle",
  y: 20,
  symbolHeight: 280,
});
