import { Link, useNavigate } from "react-router-dom";
// import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Alert from "../../components/Alert";
import { useState } from "react";
import logo from "../../logo.svg";
import { loginRequest } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import axios, { AxiosError } from "axios";
import { FormInput, LoginResponse } from "../../types";

export default function Login() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [response, setResponse] = useState<LoginResponse>();
  const [isLoading, setIsLoading] = useState(false);

  // const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const togglePassword = () => {
  //   setShowPassword(!showPassword);
  // };

  const handleSuccess = (msg: string) => {
    setResponse({ status: true, message: msg });
    setOpenDialog(true);
    setTimeout(() => {
      setOpenDialog(false);
    }, 3000);
  };

  const handleError = (err: string) => {
    setResponse({ status: false, message: err });
    setOpenDialog(true);
    setTimeout(() => {
      setOpenDialog(false);
    }, 3000);
  };

  const handleLogin = useMutation({
    mutationFn: (data: FormInput) => {
      return loginRequest(data);
    },
    onMutate: async () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      if (data.success) {
        handleSuccess(data.message);
        navigate("/");
      } else {
        handleError(data.message);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          const responseData = axiosError.response.data;
          handleError(responseData.message);
          setIsLoading(false);
        }
      }
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8 md:gap-16 mx-8">
      <img className="h-8 md:h-10" src={logo} alt="Logo" />
      <form
        onSubmit={handleSubmit((data) => {
          handleLogin.mutate(data);
        })}
        className="flex flex-col justify-center p-4 md:p-4 w-72 md:w-96 rounded-2xl bg-blue-500"
      >
        <h1 className="text-lg md:text-3xl font-extralight">Login</h1>
        <div className="mb-6">
          <div className="relative">
            <input
              autoComplete="on"
              type="text"
              id="email"
              className={`border-b-2 ${
                errors.email ? "border-red-500" : "border-blue-300"
              } focus:border-white bg-blue-500 text-sm block w-11/12 p-2.5 my-2 md:my-6 focus:outline-none caret-red-500`}
              placeholder="email"
              {...register("email", {
                required: "Can't be empty!",
              })}
            />
            {errors.email && (
              <span className="absolute top-3 right-8 text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              type="password"
              id="password"
              className={`border-b-2 ${
                errors.password ? "border-red-500" : "border-blue-300"
              } focus:border-white bg-blue-500 text-sm block w-11/12 p-2.5 my-2 md:my-6 focus:outline-none caret-red-500`}
              placeholder="************"
              {...register("password", {
                required: "Can't be empty!",
              })}
            />
            {errors.password && (
              <span className="absolute top-3 right-8 text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>
          {/* <button
                className="bg-gray-50 border-y border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onClick={togglePassword}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button> */}
        </div>
        <div className="w-full flex flex-col justify-between">
          <button
            type="submit"
            className="transition duration-200 bg-red-500 hover:bg-white hover:text-blue-500 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center mb-2"
          >
            Login
            <span className="hidden md:inline"> to your account</span>
          </button>
          <span className="text-center text-sm mt-4">
            <span className="hidden md:inline">Don't have an account? </span>
            <Link
              className="transition duration-200 text-red-500 hover:text-blue-300"
              to={"/register"}
            >
              Sign Up
            </Link>
          </span>
        </div>
      </form>
      {openDialog && <Alert response={response as LoginResponse} />}
    </div>
  );
}
