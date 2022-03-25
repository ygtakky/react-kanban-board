import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

export const theme = createTheme({
  palette: {
    primary: {
      main: "#141731",
    },
    secondary: {
      main: "#e04514",
    },
    background: {
      default: "rgba(250, 250, 250, 255)",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
