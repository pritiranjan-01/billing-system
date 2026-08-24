import { useContext } from "react";
import "./Item.css";
import { AppContext } from "../../../context/AppContext";
const Item = ({ item }) => {

  const{ addToCart } = useContext(AppContext);

  const handleAddToCart = () => {
    addToCart({
      name: item.name,
      price: item.price,
      quantity: 1,
      itemId: item.itemId
    });
  };

  return (
    <div className="p-2 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card">
      <div className="item-image-container">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-image"
        />
      </div>
      <div className="flex-grow-1 item-card-content">
        <h6 className="mb-1 text-light">{item.name}</h6>
        <p className="mb-0 fw-bold text-light">₹ {item.price}</p>
      </div>
      <div
        className="d-flex flex-column justify-content-between align-items-center item-card-actions"
        style={{ height: "100%" }}
      >
        <i className="bi bi-cart-plus fs-4 text-warning"></i>
        <button
          className="btn btn-success btn-sm"
          onClick={handleAddToCart}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Item;
