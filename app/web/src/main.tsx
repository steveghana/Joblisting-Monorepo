import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import "nprogress/nprogress.css";
import App from "./App.tsx";
import "./index.css";
// import { SidebarProvider } from './contexts/SidebarContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    {/* <SidebarProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </SidebarProvider> */}
  </HelmetProvider>
);
