import { createContext, useContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`/cms/products?page=${page + 1}`);
      const data = await response.json();

      const productsWithId = data.products.map((p, index) => ({
        id: p.id !== null ? p.id : `${page}-${index}`,
        name: p.name,
        price: p.mrp ? p.mrp.mrp : 0,
        category: p.main_category,
      }));

      setProducts(productsWithId);
      setRowCount(parseInt(data.totalResults, 10));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const value = {
    products,
    rowCount,
    loading,
    currentPage,
    setCurrentPage,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
