import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Layout.jsx/HomeLayout";
import ProfilePagelayout from "../Layout.jsx/ProfilePagelayout";
import ConnectionLayout from "../Layout.jsx/ConnectionLayout";
import SearchPagelayout from "../Layout.jsx/SerachComponentLayout";
export const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfilePagelayout />,
  },
  {
    path: "/connection",
    element: <ConnectionLayout />,
  },
  {
    path: "/search",
    element: <SearchPagelayout />,
  },
]);
