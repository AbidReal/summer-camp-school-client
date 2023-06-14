import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
// import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user } = useContext(AuthContext);
  // const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      setIsUserValid(true);
    } else {
      setIsUserValid(false);
    }
  }, [user]);

  const fetchSelectedClasses = async () => {
    try {
      const res = await axiosSecure(`/selected-classes?email=${user?.email}`);
      console.log("res drom axios", res);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Handle 403 error gracefully, e.g., show a notification, redirect to login, etc.
        console.log("Forbidden access error:", error.message);
      }
      // Return an empty array in case of any error
      return [];
    }
  };

  const { refetch, data: selectedClasses = [] } = useQuery({
    queryKey: ["selected-classes", user?.email],
    queryFn: fetchSelectedClasses,
    enabled: isUserValid,
  });

  useEffect(() => {
    if (isUserValid) {
      refetch();
    }
  }, [isUserValid, refetch]);

  return [selectedClasses, refetch];
};

export default useCart;
