import { useQuery } from "@tanstack/react-query";

const useManageClasses = () => {
  const {
    data: manageClasses,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["pending-classes"],
    queryFn: async () => {
      const res = await fetch(
        `https://summer-camp-school-server-rosy-one.vercel.app/pending-classes`
      );
      return res.json();
    },
  });

  return { manageClasses, loading, refetch }; // Return an object instead of an array
};

export default useManageClasses;
