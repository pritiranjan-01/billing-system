import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
const Menubar = () => {
  const { setAuthData, auth } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "fw-bold text-warning" : "";
  };

  const closeMobileMenu = () => {
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const logout = () => {
    closeMobileMenu();
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setAuthData(null, null);
    navigate("/login");
  };

  const isAdmin = auth.role === "ROLE_ADMIN";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <Link className="navbar-brand" to="#">
        <img src={assets.logo} alt="Logo" height="50" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarNav"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
        onClick={() => {
          setMenuOpen((isOpen) => !isOpen);
          setProfileOpen(false);
        }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse p-2 ${menuOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/dashboard")}`}
              aria-current="page"
              to="/dashboard"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/explore")}`}
              to="/explore"
              onClick={closeMobileMenu}
            >
              Explore
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/categories")}`}
                  to="/categories"
                  onClick={closeMobileMenu}
                >
                  Manage Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/items")}`}
                  to="/items"
                  onClick={closeMobileMenu}
                >
                  Manage Items
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/users")}`}
                  to="/users"
                  onClick={closeMobileMenu}
                >
                  Manage Users
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/orders")}`}
              to="/orders"
              onClick={closeMobileMenu}
            >
              Order History
            </Link>
          </li>
        </ul>
        {/* dropdown for UserProfile */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <button
              type="button"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((isOpen) => !isOpen)}
            >
              <img
                src={assets.profile}
                alt="User Icon"
                className="rounded-circle"
                height={32}
                width={32}
              />
            </button>

            <ul
              className={`dropdown-menu dropdown-menu-end ${
                profileOpen ? "show" : ""
              }`}
              aria-labelledby="navbarDropdown"
            >
              <li>
                <button type="button" className="dropdown-item">
                  Settings
                </button>
                <button type="button" className="dropdown-item">
                  Activity Log
                </button>
                <div className="dropdown-item">
                  <hr className="dropdown-divider" />
                </div>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menubar;
