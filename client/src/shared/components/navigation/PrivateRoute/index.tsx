import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../../store/useUser";

const PrivateRoute = () => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
