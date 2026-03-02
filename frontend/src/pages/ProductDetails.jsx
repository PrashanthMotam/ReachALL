import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="details-layout">
        {/* Left - Image */}
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Right - Info */}
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="details-category">{product.category}</p>

          <div className="details-price">₹{product.price}</div>

          <p className="details-description">
            {product.description}
          </p>

          <p className="details-stock">
            Stock Available: {product.stock}
          </p>

          <button
            className="details-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;