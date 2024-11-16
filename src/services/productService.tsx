import { useMutation } from "react-query";
import axios from "axios";

const token = localStorage.getItem("authToken");

export const useProduct = () => {
  return useMutation(async (data: any) => {
    const response = await axios.post(
      "http://localhost:5000/api/product/",
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

export const fetchProduct = async () => {
  const response = await axios.get("http://localhost:5000/api/product/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProduct = () => {
  return useMutation(async (data: any) => {
    const response = await axios.put(
      `http://localhost:5000/api/product/${data.id}`,
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

export const deleteProduct = () => {
  return useMutation(async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  });
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`http://localhost:5000/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchProgressOrder = async () => {
  const response = await axios.get(
    `http://localhost:5000/api/order/all/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchCompletedOrder = async () => {
  const response = await axios.get(
    `http://localhost:5000/api/order/completed/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateOrderStatus = () => {
  return useMutation(async (data: any) => {
    const response = await axios.put(
      `http://localhost:5000/api/order/updateStatus/${data.id}`,
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
