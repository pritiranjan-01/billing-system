import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { login } from "../../service/AuthService";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    console.log(data.email + " " + data.password);
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(data);
      console.log(response);
      if (response.status === 200) {
        toast.success("Login successful.");
        setLoading(false);
        localStorage.setItem("token", response.data.token);
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
    <div className="bg-light d-flex align-items-center justify-content-center vh-10 login-background">
      <div
        className="card shadow-lg w-100"
        style={{ maxWidth: "480px" }}
      >
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title">Sign in</h1>
            <p className="card-text text-muted">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label text-muted"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email Address"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label text-muted"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.password}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
