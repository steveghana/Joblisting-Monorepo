import { useRoutes } from "react-router-dom";
import router from "./router";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
