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
import Error404 from "./assets/404-bg.jpg";
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
    console.log(error.message);
    return (
      <>
        <div className="error-page">
          <div className="error-img">
            <img src={Error404} alt="" />
          </div>
          <div className="content">
            <h2>
              Oops <br />
              <span>nothing</span> here...
            </h2>
            <p>
              Uhol, we can't seem to find the pages you're looking for Try going
              back to previous page or Contact us for more information
            </p>
            <button className="btn">Go Back</button>
          </div>
        </div>
        <hr className="line" />
      </>
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
