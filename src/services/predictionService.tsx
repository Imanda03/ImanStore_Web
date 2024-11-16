import axios from "axios";

const token = localStorage.getItem("authToken");

export const fetchPredictData = async () => {
  const response = await axios.get("http://localhost:8000/api/forecast/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
