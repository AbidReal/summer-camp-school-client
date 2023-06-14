import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Classes from "../Pages/Classes/Classes";
import ManageClasses from "../Pages/Dashboards/AdminDashboard/ManageClasses";
import ManageUsers from "../Pages/Dashboards/AdminDashboard/ManageUsers";
import AddAClass from "../Pages/Dashboards/InstructorDashboard/AddAClass";
import InstructorClasses from "../Pages/Dashboards/InstructorDashboard/InstructorClasses";
import SharedDashboard from "../Pages/Dashboards/sharedDashboard";
import StudentCart from "../Pages/Dashboards/StudentDashboard/StudentCart";
import StudentEnrolled from "../Pages/Dashboards/StudentDashboard/StudentEnrolled";

import Home from "../Pages/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Login from "../Pages/LogIn&Reg/Login";
import Registration from "../Pages/LogIn&Reg/Registration";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "shared-dashboard",
            element: <SharedDashboard />,
          },
          {
            path: "my-selected-classes",
            element: <StudentCart></StudentCart>,
          },
          {
            path: "my-enrolled-classes",
            element: <StudentEnrolled />,
          },
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "manage-classes",
            element: <ManageClasses />,
          },
          {
            path: "add-a-class",
            element: <AddAClass />,
          },
          {
            path: "instructor-classes",
            element: <InstructorClasses />,
          },
        ],
      },
    ],
  },
]);
