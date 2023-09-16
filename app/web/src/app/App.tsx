import { useRoutes } from 'react-router-dom';
import router from '../router';
import '../index.css';
import '../styles/main.scss';
import '../global.css';
import AdapterDateFns from '@mui/x-date-pickers';
import LocalizationProvider from '@mui/x-date-pickers';
import 'nprogress/nprogress.css';

import { CssBaseline } from '@mui/material';
import ThemeProviderWrapper from '../theme/ThemeProvider';
import AuthProviders from '../providers/Provders';
import { NextProvider } from '../providers/NextUiprovider';
import { SidebarProvider } from './Dashboard/contexts/SidebarContext';
import Home from '../Landing/page';
// import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProviderWrapper>
      <SidebarProvider>
        <AuthProviders>
          {/* <NextProvider> */}
          {/* <NextTopLoader color="black" crawl={true} /> */}
          <CssBaseline />
          {/* {content} */}
          <Home />
        </AuthProviders>
      </SidebarProvider>
    </ThemeProviderWrapper>
  );
}
export default App;
