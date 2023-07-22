import React, { useState } from "react";
import {
  HighchartsWidget,
  HandsontableWidget,
  MaterialUITableWidget,
} from "./widgets";
import { DataSourceButton } from "./components";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import * as data from "./dataSources/versions.json";

const availableDataSource = ["versions", "regions", "products"] as const;
type AvailableDataSource = (typeof availableDataSource)[number];

function App() {
  const [dataSource, setDataSource] = useState(data);
  const [dataSourceName, setDataSourceName] =
    useState<AvailableDataSource>("versions");

  const handleClick = async (dataSource: AvailableDataSource) => {
    const rawData = await import(`./dataSources/${dataSource}.json`);
    setDataSource(rawData);
    setDataSourceName(dataSource);
  };

  const { tableHeaders, tableData } = dataSource;

  return (
    <Box className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ fontSize: 20, flexGrow: 1 }}
          >
            Developer Assessment
          </Typography>
          <Box>
            <Typography
              variant="overline"
              component="span"
              sx={{ marginRight: 3 }}
            >
              Data Source:
            </Typography>
            {availableDataSource.map((dataSource) => (
              <DataSourceButton
                key={dataSource}
                value={dataSource}
                isActive={dataSourceName === dataSource}
                onClick={handleClick}
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 3 }} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              MaterialUI Table Heatmap
            </Typography>
            <MaterialUITableWidget
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
          </Grid>
          <Grid item lg={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Highcharts Heatmap
            </Typography>
            <HighchartsWidget
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
          </Grid>
          <Grid item lg={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Handsontable Heatmap
            </Typography>

            <HandsontableWidget
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
