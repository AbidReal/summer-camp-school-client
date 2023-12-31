import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const usePendingClasses = () => {
  const { user } = useAuth();
  const { isLoading, data: pendingClasses = [] } = useQuery({
    queryKey: ["pending-classes", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://summer-camp-school-server-rosy-one.vercel.app/pending-classes?email=${user?.email}`
      );
      return res.json();
    },
    enabled: !!user?.email, // Only enable the query if the user is logged in
  });
  return [pendingClasses, isLoading];
};

export default usePendingClasses;
