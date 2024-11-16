import { useMutation } from "react-query";
import axios from "axios";

const token = localStorage.getItem("authToken");

export const useCategory = () => {
  return useMutation(async (data: { title: string; value: string }) => {
    const response = await axios.post(
      "http://localhost:5000/api/category/",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  });
};

// export const fetchCategory = () => {

//    const response= await axios.get("http://localhost:5000/api/category/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },

//     return response.data;
//   });
// };

export const fetchCategory = async () => {
  const response = await axios.get("http://localhost:5000/api/category/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
