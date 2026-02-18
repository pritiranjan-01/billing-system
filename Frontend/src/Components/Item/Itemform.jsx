import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { addItem } from "../../service/ItemService";

const Itemfrom = () => {
  const { categories, setItemsData, setCategories } =
    useContext(AppContext);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      setLoading(false);
      toast.error("Please upload an image for Category");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("itemRequestString", JSON.stringify(data));
    formData.append("file", image);
    try {
      const response = await addItem(formData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Item added successfully");
        setItemsData((prev) => [...prev, response.data]);
        // TODO[DONE]: Update Category State to update the item count in category card
        setCategories((prev) =>
          prev.map((category) =>category.categoryId === response.data.categoryId? { ...category, itemCount: category.itemCount + 1 }: category)
        );
        setData({
          name: "",
          description: "",
          categoryId: "",
          price: "",
        });
        setImage(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to add Item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-0">
      <div className="row">
        <div className=" card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : assets.upload
                    }
                    alt=""
                    width={48}
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept=".jpg,.jpeg,.png"
                  className="form-control"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Item Name"
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                  Description
                </label>
                <textarea
                  rows={5}
                  name="description"
                  id="desc"
                  className="form-control"
                  placeholder="Write a description"
                  onChange={onChangeHandler}
                  value={data.description}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  name="categoryId"
                  id="category"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.categoryId}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  id="price"
                  placeholder=" &#8377; 200.00"
                  onChange={onChangeHandler}
                  value={data.price}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning w-100"
              >
                {loading ? "Creating Item..." : "Add Item"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itemfrom;
