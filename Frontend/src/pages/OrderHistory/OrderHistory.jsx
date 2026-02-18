import { useEffect, useState } from "react";
import "./OrderHistory.css";
import { latestOrders } from "../../service/OrderService";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatItems = (items) => {
    return items
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(", ");
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-us", options);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-4">No orders found.</div>;
  }

  return (
    <div className="order-history-container">
      <h3 className="mt-2 mb-0 text-light text-center">All Orders</h3>
      <div className="table-responsive">
        <table className="table table-striped  table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payments</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.id}</td>
                <td>
                  {order.customerName} <br />
                  <small className="text-muted">
                    {order.phoneNumber}
                  </small>
                </td>
                <td>{formatItems(order.items)}</td>
                <td>₹ {order.grandTotal}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span
                    className={`badge ${
                      order.paymentDetails?.paymentStatus === "COMPLETED"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {order.paymentDetails?.paymentStatus || "PENDING"}
                  </span>
                </td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
