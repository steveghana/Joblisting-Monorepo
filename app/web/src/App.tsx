import { useSelector } from "react-redux";
import "./styles/main.scss";

// import { ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
// routing
import Routes from "./routes";

// defaultTheme

// project imports
import NavigationScroll from "./layout/NavigationScroll";
import { PureLightTheme } from "./themes/schemes/PureLightTheme";
// import { themeCreator } from "./themes/base";
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state: any) => state.customization);

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
