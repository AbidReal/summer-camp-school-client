import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";
import { AuthContext } from "../providers/AuthProvider";

// eslint-disable-next-line react/prop-types
const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();
  if (loading || isInstructorLoading) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (user && isInstructor) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default InstructorRoute;
