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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
