import { createContext, useContext } from "react";

export const ProductContext = createContext();

export const useProductsContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
