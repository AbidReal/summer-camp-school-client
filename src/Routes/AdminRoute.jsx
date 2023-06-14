import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../providers/AuthProvider";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default AdminRoute;
