import axios from "axios";

const USER_INSTANCE = axios.create({
  baseURL: "http://localhost:8000/user",
});

export const createNewUser = async (userData) => {
  try {
    const res = await USER_INSTANCE.post("/", userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await USER_INSTANCE.post("/login", userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
