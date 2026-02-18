import { assets } from "../../assets/assets";
import Category from "./Category/Category";
import "./DisplayCategory.css";

const DisplayCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <>
      <strong>
        <p>Categories</p>
      </strong>
      <div className="row" style={{ width: "100%", margin: "0" }}>
        <div
          key="all"
          className="col-6 col-md-3 col-sm-6"
          style={{ padding: "3px 10px" }}
        >
          <Category
            category={{
              categoryId: "all",
              name: "All",
              itemCount: categories.reduce(
                (acc, category) => acc + category.itemCount,
                0,
              ),
              bgColor: "#6c757d",
              imgUrl: assets.allIcon,
            }}
            isSelected={selectedCategory === ""}
            onClick={() => setSelectedCategory("")}
          />
        </div>
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="col-6 col-md-3 col-sm-6"
            style={{ padding: "3px 10px" }}
          >
            <Category
              category={category}
              isSelected={selectedCategory === category.categoryId}
              onClick={() => setSelectedCategory(category.categoryId)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayCategory;
