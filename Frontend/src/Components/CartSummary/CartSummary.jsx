import { useContext, useState } from "react";
import "./CartSummary.css";
import { AppContext } from "../../context/AppContext";
import ReceiptPopup from "./ReceiptPopup/ReceiptPopup";
import { createOrder, deleteOrder } from "../../service/OrderService";
import { toast } from "react-toastify";
import {
  createRazorpayOrder,
  verifyPayments,
} from "../../service/PaymentService";
const CartSummary = ({
  customerName,
  mobileNumber,
  setCustomerName,
  setMobileNumber,
}) => {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessingPayment, setIsProcessingPayment] =
    useState(false);
  4;
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = totalAmount * 0.18; // Assuming 18% tax
  const grandTotal = totalAmount + tax;
  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const placeOrder = () => {
    console.log("place order clicked");
    setShowPopup(true);
    clearCart();
    console.log(orderDetails);
  };

  const handlePrintReceipt = () => {
    window.print();
    clearAll();
    setShowPopup(false);
  };

  const completePayement = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer name and mobile number");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty. Please add items to cart");
      return;
    }

    const order = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subTotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessingPayment(true);
    try {
      const response = await createOrder(order);
      const savedData = response.data;
      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Order placed successfully");
        setOrderDetails(savedData);
      } else if (response.status === 201 && paymentMode === "upi") {
        const razorPayLoaded = await loadRazorpayScript();
        if (!razorPayLoaded) {
          toast.error(
            "Failed to load payment gateway. Please try again.",
          );
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        // Create Razorpay order in RAZOR pay
        const razorPayResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });

        // Receive order details from RAZOR pay i.e (order_id,amount,currency)
        // and open Razorpay checkout for Receiving payment
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: razorPayResponse.data.amount,
          currency: razorPayResponse.data.currency,
          order_id: razorPayResponse.data.id,
          name: "Billing System",
          description: "Order Payment",
          handler: async (response) => {
            await verifyPayementHandler(response, savedData);
            toast.success("Payment successful");
          },

          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              toast.error("Payment cancelled");
              await deleteOrderOnFailure(savedData.orderId);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (response) => {
          toast.error("Payment failed. Please try again.");
          await deleteOrderOnFailure(savedData.orderId);
          console.log(response.error.description);
        });
        rzp.open();
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
      setIsProcessingPayment(false);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(new Error("Failed to load Razorpay script"));
      };
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
      // console.log("Order deleted successfully");
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  const verifyPayementHandler = async (response, savedOrder) => {
    const paymentDetails = {
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const verifyResponse = await verifyPayments(paymentDetails);
      if (verifyResponse.status === 200) {
        toast.success("Payment verified successfully");
        setOrderDetails({
          ...savedOrder,
          paymentDetils: {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
      } else {
        toast.error(
          "Payment verification failed. Please contact support.",
        );
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      toast.error(
        "Payment verification failed. Please contact support.",
      );
    }
  };

  return (
    <div className="cart-summary-details">
      <div className="d-flex justify-content-between mb-2">
        <span className="text-light">Item: </span>
        <span className="text-light">
          ₹ {totalAmount.toFixed(2)}{" "}
        </span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-light">Tax (18%): </span>
        <span className="text-light">₹ {tax.toFixed(2)} </span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span className="text-light">Total: </span>
        <span className="text-light">₹ {grandTotal.toFixed(2)} </span>
      </div>
      <div className="d-flex gap-3">
        <button
          className="btn btn-success flex-grow-1"
          disabled={isProcessingPayment}
          onClick={() => completePayement("cash")}
        >
          {isProcessingPayment ? "Processing..." : "Cash"}
        </button>
        <button
          className="btn btn-primary flex-grow-1"
          disabled={isProcessingPayment}
          onClick={() => completePayement("upi")}
        >
          {isProcessingPayment ? "Processing..." : "UPI"}
        </button>
      </div>
      <div className="d-flex gap-3 mt-3">
        <button
          className="btn btn-warning flex-grow-1"
          disabled={isProcessingPayment || !orderDetails}
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
      {showPopup && (
        <ReceiptPopup
          orderDetails={{
            ...orderDetails,
            razorpayOrderId:
              orderDetails.paymentDetils?.razorpayOrderId,
            razorpayPaymentId:
              orderDetails?.paymentDetils?.razorpayPaymentId,
          }}
          onClose={() => setShowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default CartSummary;
