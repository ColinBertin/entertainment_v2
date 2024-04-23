import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Layout from "./pages/layout/Layout";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import NotFound from "./components/NotFound";
import Movie from "./pages/movies/movie/Movie";
import OneSeries from "./pages/series/one-series/OneSeries";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AxiosInterceptor from "./api/axiosInterceptor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AxiosInterceptor>
          <Layout />
        </AxiosInterceptor>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/bookmarks",
          element: <Bookmarks />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movies/:id",
          element: <Movie />,
        },
        {
          path: "/series",
          element: <Series />,
        },
        {
          path: "/series/:id",
          element: <OneSeries />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
