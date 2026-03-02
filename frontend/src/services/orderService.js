import axios from "axios";

export const placeOrderAPI = async () => {
  const res = await axios.post("http://localhost:5000/api/orders");
  return res.data;
};