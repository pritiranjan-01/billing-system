import { useEffect, useState } from "react";

import { fetchDashboardData } from "../../service/Dashboard";
import { toast } from "react-toastify";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchDashboardData();
        setData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to view the data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">Loading dashboard...</div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard-error">
        Failed to load the dashboard data...
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Stats Section */}
        <div className="dashboard-stats d-flex gap-4 mb-4">
          {/* Today's Sales */}
          <div className="stat-card flex-fill">
            <div className="stat-icon">
              <i className="bi bi-currency-rupee"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p>{data.todaySales}</p>
            </div>
          </div>

          {/* Today's Orders */}
          <div className="stat-card flex-fill">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.totalOrderCount}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <i className="bi bi-clock-history"></i>
            Recent Orders
          </h3>

          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {data.orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.grandTotal.toFixed(2)}</td>

                    <td>
                      <span
                        className={`payment-method ${order.paymentMethod.toLowerCase()}`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${order.paymentDetails.paymentStatus.toLowerCase}`}
                      >
                        {order.paymentDetails.paymentStatus}
                      </span>
                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
