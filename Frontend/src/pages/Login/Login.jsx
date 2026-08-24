import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { login } from "../../service/AuthService";
import DemoAccountButtons from "./DemoAccountButtons";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const selectDemoAccount = (credentials) => {
    setdata(credentials);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        toast.success("Login successful.");
        setLoading(false);
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setAuthData(response.data.token, response.data.role);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Email or Password is invalid.");
    }
  };

  return (
    <div className="login-background">
      <div className="card login-card w-100">
        <div className="card-body">
          <div className="login-heading">
            <div className="login-lock-icon"><i className="bi bi-lock" aria-hidden="true" /></div>
            <h1 className="card-title">Sign in</h1>
            <p className="card-text">
              Sign in below to access your account
            </p>
          </div>
          <div className="login-form">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                >
                  Email address
                </label>
                <div className="login-input">
                  <i className="bi bi-envelope" aria-hidden="true" />
                  <input id="email" type="email" name="email" placeholder="name@company.com" className="form-control" onChange={onChangeHandler} value={data.email} required />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label"
                >
                  Password
                </label>
                <div className="login-input">
                  <i className="bi bi-key" aria-hidden="true" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.password}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark login-submit"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
              <DemoAccountButtons onSelect={selectDemoAccount} />
            </form>
            <div className="login-note" role="note">
              <i className="bi bi-info-circle" aria-hidden="true" />
              <span>Admins manage categories, items, and bills.<br />Users can only create bills.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
