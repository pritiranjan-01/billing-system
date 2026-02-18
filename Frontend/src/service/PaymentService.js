import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createRazorpayOrder = async (paymentData) => {
  return await axios.post(
    `${BASE_URL}/payment/create-order`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
};

export const verifyPayments = async (paymentData) => {
  return await axios.post(`${BASE_URL}/payment/verify`, paymentData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
