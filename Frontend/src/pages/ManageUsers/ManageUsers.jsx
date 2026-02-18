import { useEffect, useState } from "react";
import Userform from "../../Components/User/Userform";
import Userlist from "../../Components/User/Userlist";
import "./ManageUsers.css";
import { fetchUser } from "../../service/UserService";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setloading(true);
        const res = await fetchUser();
        setUsers(res.data);
        setloading(false);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="users-container text-light">
      <div className="left-column">
        <Userform setUsers={setUsers} />
      </div>

      <div className="right-column">
        <Userlist setUsers={setUsers} users={users} />
      </div>
    </div>
  );
};

export default ManageUsers;
