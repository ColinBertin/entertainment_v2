import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const instance = axios.create({
  baseURL: "https://entertainment-server-ebon.vercel.app",
  withCredentials: true,
});

const AxiosInterceptor: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: AxiosError) => {
      if (error.response?.status === 401) {
        navigate("/login");
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [navigate]);

  return <>{children}</>;
};

export default AxiosInterceptor;
