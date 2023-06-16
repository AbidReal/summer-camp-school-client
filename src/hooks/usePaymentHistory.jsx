import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const usePaymentHistory = () => {
  const { user } = useAuth();
  const { isLoading, data: paymentHistory = [] } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/payments?email=${user?.email}`
      );
      return res.json();
    },
    enabled: !!user?.email, // Only enable the query if the user is logged in
  });
  return [paymentHistory, isLoading];
};

export default usePaymentHistory;
