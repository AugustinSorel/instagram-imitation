import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (false) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
