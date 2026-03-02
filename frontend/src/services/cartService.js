import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const addToCartAPI = async (productId) => {
  const res = await axios.post(API, {
    productId,
    quantity: 1
  });
  return res.data;
};

export const getCartAPI = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const removeFromCartAPI = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

export const updateCartAPI = async (id, quantity) => {
  const res = await axios.put(`${API}/${id}`, { quantity });
  return res.data;
};