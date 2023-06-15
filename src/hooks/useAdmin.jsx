import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // use axios secure with react query
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery(
    ["isAdmin", user?.email],
    async () => {
      if (user) {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data.admin;
      }
      return false;
    },
    {
      enabled: !loading, // Enable the query when the loading state is false
    }
  );

  // If user is not logged in, return false and set isAdminLoading to false
  if (!user) {
    return [false, false];
  }

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
