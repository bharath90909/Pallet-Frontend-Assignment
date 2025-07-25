import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";
import { ProductProvider } from "./context/ProductProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductProvider>
        <App />
      </ProductProvider>
    </ThemeProvider>
);
