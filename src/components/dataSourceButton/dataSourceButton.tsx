import React from "react";
import { Button } from "@mui/material";
import { DataSourceButtonProps } from "./dataSourceButton.props";

export const DataSourceButton = <T extends string>({
  value,
  activeValue,
  onClick,
}: DataSourceButtonProps<T>) => (
  <Button
    variant={activeValue === value ? "contained" : undefined}
    size="small"
    onClick={() => onClick(value)}
  >
    {value}
  </Button>
);
