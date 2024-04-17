import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import logo from "../../logo.svg";
import Alert from "../../components/Alert";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { registerRequest } from "../../api/api";
import axios, { AxiosError } from "axios";
import { FormInput, LoginResponse } from "../../types";

export default function Register() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [response, setResponse] = useState<LoginResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSuccess = (msg: string) => {
    setOpenDialog(true);
    setResponse({ status: true, message: msg });
    setTimeout(() => {
      setOpenDialog(false);
    }, 5000);
  };

  const handleError = (err: string) => {
    setOpenDialog(true);
    setResponse({ status: false, message: err });
    setTimeout(() => {
      setOpenDialog(false);
    }, 5000);
  };

  const handleRegister = useMutation({
    mutationFn: (data: FormInput) => {
      return registerRequest(data);
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
          handleRegister.mutate(data);
        })}
        className="flex flex-col justify-center p-4 md:p-4 w-72 md:w-96 rounded-2xl bg-blue-500"
      >
        <h1 className="text-lg md:text-3xl extralight">Sign Up</h1>
        <div className="mb-6">
          <div className="relative">
            <input
              autoComplete="on"
              type="text"
              id="username"
              className={`border-b-2 ${
                errors.username ? "border-red-500" : "border-blue-300"
              } focus:border-white bg-blue-500 text-sm block w-11/12 p-2.5 my-2 md:my-6 focus:outline-none caret-red-500`}
              placeholder="username"
              {...register("username", {
                required: "Can't be empty!",
              })}
            />
            {errors.username && (
              <span className="absolute top-3 right-8 text-xs text-red-500">
                {errors.username?.message}
              </span>
            )}
          </div>
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
          <div className="relative">
            <input
              autoComplete="off"
              type="password"
              id="passwordTest"
              className={`border-b-2 ${
                errors.passwordTest ? "border-red-500" : "border-blue-300"
              } focus:border-white bg-blue-500 text-sm block w-11/12 p-2.5 my-2 md:my-6 focus:outline-none caret-red-500`}
              placeholder="************"
              {...register("passwordTest", {
                required: "Can't be empty!",
                validate: (val?: string) =>
                  val === getValues("password") ||
                  val === undefined ||
                  "The password must be the same!",
              })}
            />
            {errors.passwordTest && (
              <span className="absolute top-3 right-8 text-xs text-red-500">
                {errors.passwordTest?.message}
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
            Create an account
          </button>
          <span className="text-center text-sm mt-4">
            <span className="hidden md:inline">Already have an account? </span>
            <Link
              className="transition duration-200 text-red-500 hover:text-blue-300"
              to={"/login"}
            >
              Login
            </Link>
          </span>
        </div>
      </form>
      {openDialog && <Alert response={response as LoginResponse} />}
    </div>
  );
}
