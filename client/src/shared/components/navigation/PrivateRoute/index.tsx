import { Navigate, Outlet } from "react-router-dom";
import useFetchUser from "../../../hooks/useFetchUser";
import useUser from "../../../store/useUser";

const PrivateRoute = () => {
  const { isAuthenticated } = useUser();
  const { isLoading } = useFetchUser();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
