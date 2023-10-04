import { useSelector } from "react-redux";
import React from "react";
// import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

// routing
import Routes from "./routes";

// defaultTheme

// project imports
import NavigationScroll from "./layout/NavigationScroll";
import ThemeProviderWrapper from "../../src/theme/ThemeProvider";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state: any) => state.customization);

  return (
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </LocalizationProvider>
    </ThemeProviderWrapper>
  );
};

export default App;
