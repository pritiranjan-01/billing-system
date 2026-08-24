import { useContext } from "react";
import "./CartItems.css";
import { AppContext } from "../../context/AppContext";
const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity } =
    useContext(AppContext);

  return (
    <section className="cart-items">
      <h2 className="cart-items-title">Cart Items</h2>
      <div className="cart-items-list-wrapper">
        {cartItems.length === 0 ? (
          <p className="text-center text-light">No items in cart</p>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="cart-item mb-3 p-3 bg-dark rounded"
                >
                  <div className="cart-item-header">
                    <h6 className="cart-item-name mb-0 text-light">
                      {item.name}
                    </h6>
                    <p className="cart-item-price mb-0 text-light">
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          updateQuantity(
                            item.itemId,
                            item.quantity - 1,
                          )
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="text-light">
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          updateQuantity(
                            item.itemId,
                            item.quantity + 1,
                          )
                        }
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ width: "auto" }}
                      onClick={() => removeFromCart(item.itemId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CartItems;
