import Itemfrom from "../../Components/Item/Itemform";
import Itemlist from "../../Components/Item/Itemlist";
import "./ManageItems.css";
const ManageItems = () => {
  return (
    <div className="items-container text-light">
      <div className="left-column">
        <Itemfrom />
      </div>

      <div className="right-column">
        <Itemlist />
      </div>
    </div>
  );
};

export default ManageItems;
