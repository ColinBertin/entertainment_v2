import axios from "axios";

export const verifyTokenAndGetData = async () => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth`,
      {},
      { withCredentials: true }
    );
    if (!data.status) {
      throw new Error("Failed to verify token");
    }

    return data.user;
  } catch (error) {
    throw new Error("Failed to verify token");
  }
};
