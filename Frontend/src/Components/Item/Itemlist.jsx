import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../service/ItemService";
import { toast } from "react-toastify";
import "./Itemlist.css";

const Itemlist = () => {
  const { itemsData, setItemsData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = itemsData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const removeItem = async (itemId) => {
    try {
      const res = await deleteItem(itemId);
      if (res.status === 204) {
        setItemsData((prev) =>
          prev.filter((item) => item.itemId !== itemId),
        );
        toast.success("Item deleted successfully");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <>
      <div
        className="category-list-container "
        style={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="row pe-2">
          <div className="input-group mb-3">
            <input
              type="text"
              name="keyword"
              id="keyword"
              placeholder="Search by Keyword"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text bg-warning">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
        <div className="row-2 g-3 pe-2">
          {filteredItems.map((item, index) => (
            <div className="col-12 mb-2 " key={index}>
              <div className="card p3 bg-dark">
                <div className="d-flex align-item-center p-2">
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="item-image"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-white ">{item.name}</h6>
                    <p className="mb-0 text-white">
                      Category: {item.categoryName}
                    </p>
                    <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                      &#8377; {item.price}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-danger btn-m"
                      onClick={() => removeItem(item.itemId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Itemlist;
