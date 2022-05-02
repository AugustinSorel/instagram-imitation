import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../../api/userApi";
import useUser from "../../../store/useUser";

const PrivateRoute = () => {
  const { isAuthenticated, setIsAuthenticated } = useUser();

  const { isLoading } = useQuery("user", getUser, {
    retry: false,

    onSuccess: () => setIsAuthenticated(true),
    onError: () => setIsAuthenticated(false),
  });

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
