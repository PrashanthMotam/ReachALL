import { useState } from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    placeOrder
  } = useCart();

  const [orderSuccess, setOrderSuccess] = useState(false);

  return (
    <div className="container">
      <div className="title">Your Cart</div>

      {orderSuccess ? (
        <div className="order-success">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for shopping with us.</p>
        </div>
      ) : cartItems.length === 0 ? (
        <p>Cart is Empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-card" key={item._id}>

              <img
                src={item.productId.image}
                alt={item.productId.name}
                width="120"
              />

              <div className="cart-info">
                <h3>{item.productId.name}</h3>
                <p>₹{item.productId.price}</p>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
              </div>

              <div className="cart-actions">
                <p>₹{item.totalPrice}</p>
                <button onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>

            </div>
          ))}

          <div style={{ marginTop: "30px" }}>
            <h3>Total: ₹{totalPrice}</h3>

            <button
              className="checkout-btn"
              onClick={async () => {
                await placeOrder();
                setOrderSuccess(true);
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;