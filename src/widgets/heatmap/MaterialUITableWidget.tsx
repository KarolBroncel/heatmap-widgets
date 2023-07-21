import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { HeatmapProps } from "./Heatmap.props";
import { extractNumericData, calculateColor } from "../../utils";

export const MaterialUITableWidget = (props: HeatmapProps) => {
  const { tableData, tableHeaders } = props;

  const { min, max } = extractNumericData(tableData);

  const showColHeader = (item: string, index: number) => {
    return <TableCell key={`${item}_${index}`}>{item}</TableCell>;
  };

  const showColHeaders = () => {
    return (
      <TableRow>
        {tableHeaders.map((header, index) => showColHeader(header, index))}
      </TableRow>
    );
  };

  const showRowItem = (item: Array<string | number>) => {
    return item.map((x, index) =>
      typeof x === "number" ? (
        <TableCell
          key={`${x}_${index}`}
          sx={{
            background: calculateColor(x, min, max),
            border: "1px solid white",
          }}
          title={String(x)}
        />
      ) : (
        <TableCell key={`${x}_${index}`}>{x}</TableCell>
      )
    );
  };

  const showRowData = () => {
    return tableData.map((x, index) => (
      <TableRow key={`${x[0]}_${index}`}>{showRowItem(x)}</TableRow>
    ));
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>{showColHeaders()}</TableHead>
          <TableBody>{showRowData()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
