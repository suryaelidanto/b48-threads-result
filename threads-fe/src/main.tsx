import {
  ChakraProvider,
  Colors,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./stores/rootReducer.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const colors: Colors = {
  brand: {
    grey: "#878787",
    green: "#04A51E",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ colors, config });

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <App />
          <ToastContainer />
        </Provider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
