import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import ProductGrid from "./ProductGrid";
import ProductDetail from "./ProductDetail";
import { ProductProvider } from "./context/ProductContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductGrid />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </ThemeProvider>
  </React.StrictMode>
);
