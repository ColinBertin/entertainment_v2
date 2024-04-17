import {instance} from "./axiosInterceptor";

const url = process.env.REACT_APP_API_URL;

export const registerRequest = async (formData: {
  username: string;
  email: string;
  password: string;
  passwordTest: string;
}) => {
  try {
      const { data } = await instance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/register`,
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      const { success } = data;

      if(success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export const loginRequest = async (formData: {
  email: string;
  password: string;
}) => {
  try {
      const { data } = await instance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/login`,
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      const { success } = data;

      if(success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export const logoutRequest = async () => {
  try {
      const { data } = await instance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      const { success } = data;

      if(success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export const bookmarkContent = async ({contentId, contentType}: {contentId: string, contentType: string}) => {
 try {
      const { data } = await instance.post(
        `${url}/api/v1/bookmarks`,
        {
          contentId,
          contentType,
        },
        {
          withCredentials: true,
        }
      );

      const { success } = data;

      if (success) {
        return contentType;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
};

export const deleteBookmark = async ({contentId, contentType}: {contentId: string, contentType: string}) => {
    try {
      const { data } = await instance.delete(
        `${url}/api/v1/bookmarks`,
        {
          data: {
            contentId,
          },
          withCredentials: true,
        }
      );

      const { success } = data;

      if (success) {
        return contentType;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
