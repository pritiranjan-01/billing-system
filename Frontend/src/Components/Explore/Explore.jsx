// import { useContext, useState } from "react";
// import CartItems from "../CartItems/Cartitems";
// import CartSummary from "../CartSummary/CartSummary";
// import CustomerForm from "../CustomerForm/CustomerForm";
// import DisplayCategory from "../DisplayCategory/DisplayCategory";
// import DisplayItem from "../DisplayItem/DisplayItem";
// import { AppContext } from "../../context/AppContext";

// const Explore = () => {
//   const { categories } = useContext(AppContext);
//   const [customerName, setCustomerName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");

//   return (
//     <div className="explore-container text-light">
//       <div className="left-column">
//         <div className="first-row" style={{ overflowY: "auto" }}>
//           <DisplayCategory categories={categories} />
//         </div>
//         <hr className="horizontal-line" />
//         <div className="second-row" style={{ overflowY: "auto" }}>
//           <DisplayItem />
//         </div>
//       </div>
//       <div
//         className="right-column d-flex flex-column"
//         style={{ height: "15%" }}
//       >
//         <div
//           className="customer-form-container"
//           style={{ height: "15%" }}
//         >
//           <CustomerForm
//             customerName={customerName}
//             mobileNumber={mobileNumber}
//             setCustomerName={setCustomerName}
//             setMobileNumber={setMobileNumber}
//           />
//         </div>
//         <hr className="my-3 text-light" />
//         <div
//           className="cart-items-container"
//           style={{ height: "55%", overflowY: "auto" }}
//         >
//           <CartItems />
//         </div>
//         <hr className="my-3 text-light" />
//         <div className="cart-summary-container">
//           <CartSummary
//             customerName={customerName}
//             mobileNumber={mobileNumber}
//             setCustomerName={setCustomerName}
//             setMobileNumber={setMobileNumber}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Explore;
