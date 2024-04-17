import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import SearchBarProvider from "../../components/SearchBarProvider";
import SearchBar from "../../components/SearchBar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../../api/api";
import axios, { AxiosError } from "axios";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, removeCookie] = useCookies(["token"]);

  const handleLogout = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      if (data.success) {
        navigate("/login");
        removeCookie("token", "");
        queryClient.invalidateQueries();
        window.location.reload();
        // handleSuccess(data.message);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          const responseData = axiosError.response.data;
          console.log(responseData);
          // handleError(responseData.message);
          // setIsLoading(false);
        }
      }
    },
  });

  const logout = () => {
    handleLogout.mutate();
    // try {
    //   removeCookie("token", "");
    //   queryClient.invalidateQueries();
    //   navigate("/login");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="flex flex-col items-center xl:items-start h-screen">
      <NavBar logout={logout} />
      <div className="static pt-24 pb-4 xl:pb-8 xl:pt-8 xl:pl-36 px-4 xl:px-16 w-full self-center">
        <SearchBarProvider>
          {(location.pathname === "/series" ||
            location.pathname === "/movies" ||
            location.pathname === "/bookmarks" ||
            location.pathname === "/") && <SearchBar />}
          <Outlet />
        </SearchBarProvider>
      </div>
    </div>
  );
}
