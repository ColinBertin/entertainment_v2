import { instance } from "./axiosInterceptor";

const url = process.env.REACT_APP_API_URL;

export const registerRequest = async (formData: {
  username: string;
  email: string;
  password: string;
  passwordTest: string;
  profileImage: any;
}) => {
  try {
    const form = new FormData();

    // Update the formData object
    form.append("profileImage", formData.profileImage);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("passwordTest", formData.passwordTest);
    console.log(form);
    const { data } = await instance.post(`${url}/api/v1/register`, {
     ...form
    });

    const { success } = data;

    if (success) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginRequest = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await instance.post(`${url}/api/v1/login`, {
      ...formData,
    });

    const { success } = data;

    if (success) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutRequest = async () => {
  try {
    const { data } = await instance.post(`${url}/api/v1/logout`);

    const { success } = data;

    if (success) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const bookmarkContent = async ({
  contentId,
  contentType,
}: {
  contentId: string;
  contentType: string;
}) => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data } = await instance.post(
      `${url}/api/v1/bookmarks`,
      {
        contentId,
        contentType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const deleteBookmark = async ({
  contentId,
  contentType,
}: {
  contentId: string;
  contentType: string;
}) => {
  try {
    const token = await sessionStorage.getItem("token");
    const { data } = await instance.delete(`${url}/api/v1/bookmarks`, {
      data: {
        contentId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { success } = data;

    if (success) {
      return contentType;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
