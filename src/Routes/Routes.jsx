import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import Main from "../Layout/Main";
import Classes from "../Pages/Classes/Classes";
import Home from "../Pages/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Login from "../Pages/LogIn&Reg/Login";
import Registration from "../Pages/LogIn&Reg/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);
