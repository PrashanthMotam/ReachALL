import { Link } from "react-router-dom";

function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={product.image} alt={product.name} />

        <div className="card-content">
          <h3>{product.name}</h3>

          <p>
            {product.description.length > 60
              ? product.description.substring(0, 60) + "..."
              : product.description}
          </p>

          <div className="price">₹{product.price}</div>

          <div className="category">
            {product.category}
          </div>
        </div>
      </Link>

      {onAdd && (
        <button onClick={() => onAdd(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;