import Categoryform from "../../Components/Category/Categoryform";
import CategoryList from "../../Components/Category/CategoryList";
import "./ManageCategory.css";
const ManageCategory = () => {
  return (
    <div className="category-container text-light">
      <div className="left-column">
        <Categoryform />
      </div>

      <div className="right-column">
        <CategoryList />
      </div>
    </div>
  );
};

export default ManageCategory;
