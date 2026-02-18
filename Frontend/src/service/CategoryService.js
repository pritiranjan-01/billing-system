import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// console.log(localStorage.getItem("token"));

export const addCategory = async (category) => {
  return await axios.post(`${BASE_URL}/admin/category`, category, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const fetchCategories = async () => {
  return (
    await axios.get(`${BASE_URL}/categories`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ));
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(
    `${BASE_URL}/admin/category/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
};
