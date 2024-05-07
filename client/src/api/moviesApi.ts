import { instance } from "./axiosInterceptor";

const url = process.env.REACT_APP_API_URL;

// fetch all the movies
export const fetchMovies = async () => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data, status } = await instance.get(`${url}/api/v1/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status === 200) {
      return data;
    }
    return [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch a specific movie
export const fetchMovie = async (id: string) => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data, status } = await instance.get(`${url}/api/v1/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status === 200) {
      return data;
    }
    return {};
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch bookmarked movies
export const fetchBookmarkedMovies = async () => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data, status } = await instance.get(
      `${url}/api/v1/bookmarks/movies`,
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
