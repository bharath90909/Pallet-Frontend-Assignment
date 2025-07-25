import { useEffect, useState } from "react";
import dummyProduct from "../assets/dummyImages/dummy-product.png";
import { ProductContext } from "../hooks/useProductsContext";

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

      const products = data.products.map((p, index) => ({
        id: p.id !== null ? p.id : `${page}-${index}`,
        name: p.name || "Product Name Not Available",
        category: p.main_category || "Category Not Available",
        description: p.description || "Product Description Not Available",
        price: p.mrp ? p.mrp.mrp : 0,
        image_url: p.images?.top || dummyProduct,
      }));

      setProducts(products);
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

  return (
    <ProductContext.Provider
      value={{
        products,
        rowCount,
        loading,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
