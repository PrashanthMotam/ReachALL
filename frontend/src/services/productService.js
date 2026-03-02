import axios from "axios";

const API = "http://localhost:5000/api/products";

export const fetchProducts = async (search, page) => {
  const res = await axios.get(API, {
    params: { search, page }
  });
  return res.data;
};