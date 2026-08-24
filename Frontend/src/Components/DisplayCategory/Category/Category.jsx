import "./Category.css";
const Category = ({ category, isSelected, onClick }) => {
  return (
    <div
      className="category-card d-flex align-items-center rounded position-relative category-hover"
      style={{
        backgroundColor: `${category.bgColor}`,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="category-card-image-wrap">
        <img
          src={category.imgUrl}
          alt={category.name}
          className="category-image"
        />
      </div>
      <div className="category-card-content">
        <h6 className="text-white mb-0">{category.name}</h6>
        <p className="text-white mb-0">{category.itemCount}</p>
      </div>
      {isSelected && <div className="active-category"></div>}
    </div>
  );
};

export default Category;
