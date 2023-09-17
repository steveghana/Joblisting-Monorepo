import { useRoutes } from "react-router-dom";
import router from "./router";
import "./styles/main.scss";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AuthProviders from "./providers/Provders";
import Overview from "./app/pages/overview";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      {/* <AuthProviders> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {/* <Overview /> */}
        {content}
      </LocalizationProvider>
      {/* </AuthProviders> */}
    </ThemeProvider>
  );
}
export default App;
