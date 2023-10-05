import { useSelector } from "react-redux";
import React from "react";
// import { ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

// routing
import Routes from "./routes";

// defaultTheme

// project imports
import NavigationScroll from "./layout/NavigationScroll";
import ThemeProviderWrapper from "../../src/theme/ThemeProvider";
import { PureLightTheme } from "./themes/schemes/PureLightTheme";
import { themeCreator } from "./themes/base";
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state: any) => state.customization);
  const theme = themeCreator("PureLightTheme");

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={PureLightTheme}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
