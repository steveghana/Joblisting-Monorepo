import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import "nprogress/nprogress.css";
import "../berry/src/assets/scss/style.scss";
import config from "./config";

// import App from "./App.tsx";
import App from "../berry/src/App.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
// import { SidebarProvider } from './contexts/SidebarContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <HelmetProvider> */}
    {/* <SidebarProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </SidebarProvider> */}
    {/* </HelmetProvider> */}
  </Provider>
);
