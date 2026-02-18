import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const addItem = async (item) => {
  return await axios.post(`${BASE_URL}/admin/items`, item, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteItem = async (itemId) => {
  return await axios.delete(`${BASE_URL}/admin/item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const fetchItem = async () => {
  return await axios.get(`${BASE_URL}/item`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
