// import { useRoutes } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
// import { BrowserRouter } from 'react-router-dom';

import "nprogress/nprogress.css";
import { SidebarProvider } from "./contexts/SidebarContext";
import * as serviceWorker from "./serviceWorker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/x-date-pickers";

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  // const content = useRoutes(router);

  return (
    <HelmetProvider>
      <SidebarProvider>
        <ThemeProvider>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          {/* <CssBaseline /> */}
          <div></div>
          {/* {content} */}
          {/* </LocalizationProvider> */}
        </ThemeProvider>
      </SidebarProvider>
    </HelmetProvider>
  );
}
export default App;
