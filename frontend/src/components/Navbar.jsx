import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      padding: "15px",
      background: "#222",
      color: "#fff"
    }}>
      <Link to="/" style={{ color: "#fff", marginRight: "20px" }}>
        Home
      </Link>
      <Link to="/cart" style={{ color: "#fff" }}>
        Cart
      </Link>
    </nav>
  );
}
export default Navbar;