import { useContext, useState } from "react";
import "./CategoryList.css";
import { AppContext } from "../../context/AppContext";

import { Slide, toast, ToastContainer } from "react-toastify";
import { deleteCategory } from "../../service/CategoryService";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const deleteByCategoryId = async (categoryId) => {
    try {
      const res = await deleteCategory(categoryId);

      if (res.status === 204) {
        setCategories((prev) =>
          prev.filter(
            (category) => category.categoryId !== categoryId,
          ),
        );
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the category");
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
          {filteredCategories.map((category, index) => (
            <div key={index} className="col-12">
              <div
                className="card p-3 mb-2"
                style={{ backgroundColor: category.bgColor }}
              >
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={category.imgUrl}
                      alt={category.name}
                      className="category-image"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">
                      {category.name}
                    </h5>
                    <p className="mb-0 text-white">
                      {category.itemCount}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      deleteByCategoryId(category.categoryId)
                    }
                    className="btn btn-danger btn-sm"
                    style={{ border: "2px solid black" }}
                  >
                    <i className="bi bi-trash text-white"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
