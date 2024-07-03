import axios from "axios";

const COFFEE_INSTANCE = axios.create({
  baseURL: "http://localhost:8000/coffee",
});

export const addCoffee = async (coffeeData, token) => {
  try {
    const res = await COFFEE_INSTANCE.post("/", coffeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getOneCoffeeId = async (id, token) => {
  try {
    const res = await COFFEE_INSTANCE.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCoffee = async (token) => {
  try {
    const res = await COFFEE_INSTANCE.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOneCoffeeId = async (id, token) => {
  try {
    const res = await COFFEE_INSTANCE.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateOneCoffeeId = async (data, token) => {
  try {
    const res = await COFFEE_INSTANCE.put(`/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
