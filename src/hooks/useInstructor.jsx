import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // use axios secure with react query
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery(
    ["isInstructor", user?.email],
    async () => {
      if (user) {
        const res = await axiosSecure.get(`/users/instructor/${user.email}`);
        return res.data.instructor;
      }
      return false;
    },
    {
      enabled: !loading, // Enable the query when the loading state is false
    }
  );

  // If user is not logged in, return false and set isInstructorLoading to false
  if (!user) {
    return [false, false];
  }

  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
