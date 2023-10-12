import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import "nprogress/nprogress.css";
import "../src/assets/scss/style.scss";
// import config from "./src/config";

// import App from "./App.tsx";
import App from "./App";
// import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { Provider } from "react-redux";
import store from "./store";
// import { SidebarProvider } from './contexts/SidebarContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
