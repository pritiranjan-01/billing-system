/* eslint-disable react-hooks/static-components */
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Menubar from "./Components/Menubar/Menubar.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import { Slide, ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import { AppContext } from "./context/AppContext.jsx";
import { useContext } from "react";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  const location = useLocation();
  const {auth} = useContext(AppContext);

  const LoginRoute = ({element}) => {
    if(auth.token) {
      return <Navigate to="/dashboard" replace />
    }
    return element;
  }

  const ProtectedRoute = ({element, allowedRoles}) => {
    if(!auth.token) {
      return <Navigate to="/login" replace />
    }
    if(allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />
    }
    return element;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="dark"
        transition={Slide}
      />
      {location.pathname !== "/login" && <Menubar />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />

        {/* Admin only routes  */}
        // eslint-disable-next-line react-hooks/static-components
        <Route path="/users" element={ <ProtectedRoute element={<ManageUsers />} allowedRoles={["ROLE_ADMIN"]}/>} />
        <Route path="/categories" element={ <ProtectedRoute element={<ManageCategory />} allowedRoles={["ROLE_ADMIN"]}/>} />
        <Route path="/items" element={ <ProtectedRoute element={<ManageItems />} allowedRoles={["ROLE_ADMIN"]}/>} />

        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/login" element={<LoginRoute element={<Login/>} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />


      </Routes>
    </>
  );
}

export default App;
