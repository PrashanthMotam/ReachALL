import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/productCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { addToCart } = useCart();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(search, page);

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  return (
    <div className="container">
      <div className="title">Discover Phones & Gadgets</div>

      <div className="search-bar">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setPage(1);
            loadProducts();
          }}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <>
          <div className="horizontal-scroll">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onAdd={addToCart}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;