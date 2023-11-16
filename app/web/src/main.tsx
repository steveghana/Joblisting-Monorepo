import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "nprogress/nprogress.css";
import "../src/assets/scss/style.scss";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import FullscreenProgress from "./components/FullscreenProgress/FullscreenProgress";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <PersistGate loading={<FullscreenProgress />} persistor={persistor}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);
