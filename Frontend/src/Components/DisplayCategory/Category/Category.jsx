import "./Category.css";
const Category = ({ category, isSelected, onClick }) => {
  return (
    <div
      className="d-flex align-items-center p-2 rounded gap-1 position-relative category-hover"
      style={{
        backgroundColor: `${category.bgColor}`,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img
          src={category.imgUrl}
          alt={category.name}
          className="category-image"
        />
      </div>
      <div>
        <h6 className="text-white mb-0">{category.name}</h6>
        <p className="text-white mb-0">{category.itemCount}</p>
      </div>
      {isSelected && <div className="active-category"></div>}
    </div>
  );
};

export default Category;
