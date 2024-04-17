import { useNavigate } from "react-router-dom";
import { verifyTokenAndGetData } from "./Auth";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;
    console.log(token);
    if (token) {
      verifyTokenAndGetData()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Failed to verify token:", error);
          removeCookie("token", "");
          navigate("/login");
          return;
        });
    } else {
      navigate("/login");
    }
  }, [cookies, removeCookie, navigate]);

  // if (!isConnected) {
  //   // if user is not authenticated redirect to login page
  //   return <Navigate to="/login" />;
  // }
  return children as JSX.Element;
};

export default ProtectedRoute;
