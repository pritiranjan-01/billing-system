import { useContext, useState } from "react";
import "./Explore.css";
import { AppContext } from "../../context/AppContext";
import DisplayCategory from "../../Components/DisplayCategory/DisplayCategory";
import DisplayItem from "../../Components/DisplayItem/DisplayItem";
import CustomerForm from "../../Components/CustomerForm/CustomerForm";
import CartItems from "../../Components/CartItems/CartItems";
import CartSummary from "../../Components/CartSummary/CartSummary";
const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row">
          <DisplayCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>
        <hr className="horizontal-line" />
        <div className="second-row">
          <DisplayItem selectedCategory={selectedCategory} />
        </div>
      </div>
      <div className="right-column d-flex flex-column">
        <div className="customer-form-container">
          <CustomerForm
            customerName={customerName}
            mobileNumber={mobileNumber}
            setCustomerName={setCustomerName}
            setMobileNumber={setMobileNumber}
          />
        </div>
        <hr className="my-3 text-light" />
        <div className="cart-items-container">
          <CartItems />
        </div>
        <div className="cart-summary-container">
          <CartSummary
            customerName={customerName}
            mobileNumber={mobileNumber}
            setCustomerName={setCustomerName}
            setMobileNumber={setMobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
