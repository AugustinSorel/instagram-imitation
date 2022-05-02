import { useQuery } from "react-query";
import { getUser } from "../api/userApi";
import useUser from "../store/useUser";

const useFetchUser = () => {
  const { setIsAuthenticated } = useUser();

  const { isLoading } = useQuery("user", getUser, {
    retry: false,

    onSuccess: () => setIsAuthenticated(true),
    onError: () => setIsAuthenticated(false),
  });

  return { isLoading };
};

export default useFetchUser;
