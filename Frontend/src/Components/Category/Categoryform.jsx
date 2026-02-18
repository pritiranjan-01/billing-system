import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { addCategory } from "../../service/CategoryService";
import { AppContext } from "../../context/AppContext";

const Categoryform = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#651c1c",
  });

  useEffect(() => {
  }, [data]);

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
    formData.append("categoryRequest", JSON.stringify(data));
    formData.append("file", image);
    try {
      const response = await addCategory(formData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Category added successfully");
        setCategories([...categories, response.data]);

        setData({
          name: "",
          description: "",
          bgColor: "#870f0f",
        });
        setimage(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to add category");
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
                <label htmlFor="image" className="form-label">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : assets.upload
                    }
                    alt=""
                    width={48}
                    height={48}
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  accept=".jpg,.jpeg,.png"
                  hidden
                  onChange={(e) => setimage(e.target.files[0])}
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
                  placeholder="Category Name"
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
                  id="desc"
                  name="description"
                  className="form-control"
                  placeholder="Write a description"
                  onChange={onChangeHandler}
                  value={data.description}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bgColor">Background Color</label>
                <br />
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  placeholder="#ffffff"
                  onChange={onChangeHandler}
                  value={data.bgColor}
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Submiting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categoryform;
