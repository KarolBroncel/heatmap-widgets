import React from "react";
import { Button } from "@mui/material";
import { DataSourceButtonProps } from "./dataSourceButton.props";

export const DataSourceButton = <T extends string>({
  value,
  onClick,
  isActive = false,
}: DataSourceButtonProps<T>) => (
  <Button
    variant={isActive ? "contained" : undefined}
    size="small"
    onClick={() => onClick(value)}
  >
    {value}
  </Button>
);
