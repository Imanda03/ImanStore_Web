import { useMutation } from "react-query";
import axios from "axios";

const token = localStorage.getItem("authToken");
export const useLogin = () => {
  return useMutation(async (loginData: { email: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      loginData
    );
    return response.data;
  });
};
