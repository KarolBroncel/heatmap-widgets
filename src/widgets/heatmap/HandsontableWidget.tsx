import React from "react";

import { Box, Paper, TableContainer } from "@mui/material";

import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";

import { textRenderer } from "handsontable/renderers";
import { CellMeta, GridSettings } from "handsontable/settings";

import { HeatmapProps } from "./Heatmap.props";
import { calculateColor, extractNumericData } from "../../utils";

export const HandsontableWidget = (props: HeatmapProps) => {
  const { tableData, tableHeaders } = props;
  const { min, max } = extractNumericData(tableData);

  const headerRenderer: GridSettings["renderer"] = (
    instance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties
  ) => {
    textRenderer(instance, td, row, col, prop, value, cellProperties);

    td.style.textAlign = "center";
    td.style.verticalAlign = "middle";
    td.style.background = "#ffffff";
    td.style.color = "#050505";
    td.style.border = "none";
  };

  const heatmapRenderer: GridSettings["renderer"] = (
    _instance,
    td,
    _row,
    _col,
    _prop,
    value,
    _cellProperties
  ) => {
    const backgroundColor = calculateColor(value, min, max);
    td.style.background = backgroundColor;
    td.title = value;
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <HotTable
          data={[tableHeaders, ...tableData]}
          licenseKey="non-commercial-and-evaluation"
          height="auto"
          rowHeights={100}
          colWidths={100}
          rowHeaders={false}
          colHeaders={false}
          cells={(row, column) => {
            const cellProperties: CellMeta = {};
            cellProperties.readOnly = true;
            if (row === 0 || column === 0) {
              cellProperties.renderer = headerRenderer;
            } else {
              cellProperties.renderer = heatmapRenderer;
            }

            return cellProperties;
          }}
        />
      </TableContainer>
    </Box>
  );
};
