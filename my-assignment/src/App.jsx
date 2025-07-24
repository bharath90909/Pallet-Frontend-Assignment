import "./App.css";
import ProductGrid from "./ProductGrid";

function App() {
  return (
    <>
      <h1>Our Products</h1>
      <p>Explore our wide range of quality grocery products</p>
      <div className="product-grid-container">
        <ProductGrid />
      </div>
    </>
  );
}

export default App;
