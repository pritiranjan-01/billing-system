import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";
import { fetchItem } from "../service/ItemService";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });

  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(
      cartItems.filter((cartItem) => cartItem.itemId !== itemId),
    );
  };

  const updateQuantity = (itemId, newQuantity) => {
    console.log(itemId);
    console.log(newQuantity);
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const setAuthData = (token, role) => {
    setAuth({
      token,
      role,
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const loadData = async () => {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("role")
      ) {
        setAuthData(
          localStorage.getItem("token"),
          localStorage.getItem("role"),
        );
      }

      try {
        const categoryResponse = await fetchCategories();
        const itemResponse = await fetchItem();
        setItemsData(itemResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
