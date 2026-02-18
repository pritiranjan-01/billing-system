import { toast } from "react-toastify";
import { addUser } from "../../service/UserService";
import { useState } from "react";

const Userform = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await addUser(data);
      if (res.status === 201) {
        setUsers((prev) => [...prev, res.data]);
        toast.success("User created successfully");
        setdata({
          name: "",
          email: "",
          password: "",
          role: "ROLE_USER",
        });
      }
    } catch (error) {
      toast.error("Failed to create user");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-3 mt-2">
      <div className="row">
        <div className=" card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={onChangeHandler}
                  value={data.email}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={onChangeHandler}
                  value={data.password}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userform;
