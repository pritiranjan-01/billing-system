import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./DisplayItem.css";
import Item from "./Item/Item";
import SearchBox from "./SearchBox/SearchBox";
const DisplayItem = ({ selectedCategory }) => {
  const { itemsData } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const filteredItems = itemsData
    .filter((item) => {
      if (!selectedCategory) return true;
      return item.categoryId === selectedCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

  return (
    <>
      <div className="row p-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>
              <p>Items</p>
            </strong>
          </div>
          <div>
            <SearchBox onSearch={setSearchText} />
          </div>
        </div>
        {filteredItems.map((item, index) => (
          <div key={index} className="col-md-4 mb-2 col-sm-6">
            <Item item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayItem;
