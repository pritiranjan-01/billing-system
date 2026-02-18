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
    <div className="p-1 bg-dark rounded shadow-sm h-100 d-flex align-item-center g-0 item-card">
      <div
        className="item-image-container"
        style={{ position: "relative", marginRight: "15px" }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-image"
        />
      </div>
      <div className="flex-grow-1 ms-2">
        <h6 className="mb-1 text-light">{item.name}</h6>
        <p className="mb-0 fw-bold text-light">₹ {item.price}</p>
      </div>
      <div
        className="d-flex flex-column justify-content-between aign-item-center ms-10"
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
