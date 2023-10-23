import { useSelector } from "react-redux";
import "./styles/main.scss";
import { ErrorBoundary } from "react-error-boundary";
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
  function fallbackRender({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={PureLightTheme}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  );
};

export default App;
