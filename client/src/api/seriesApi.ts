import { instance } from "./axiosInterceptor";

const url = process.env.REACT_APP_API_URL;

// fetch all the series
export const fetchSeries = async () => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data, status } = await instance.get(`${url}/api/v1/series`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status === 200) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fetch a specific series
export const fetchOneSeries = async (id: string) => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data, status } = await instance.get(`${url}/api/v1/series/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch bookmarked series
export const fetchBookmarkedSeries = async () => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data, status } = await instance.get(
      `${url}/api/v1/bookmarks/series`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
