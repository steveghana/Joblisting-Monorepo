import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "nprogress/nprogress.css";
import "../src/assets/scss/style.scss";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import FullscreenProgress from "./components/FullscreenProgress/FullscreenProgress";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={
      "98962994226-v6lsqu50ttq5jgtnu2qs8eucishhej5n.apps.googleusercontent.com"
    }
  >
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate /* s */ persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
