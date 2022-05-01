import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../../store/useUser";

const PrivateRoute = () => {
  const { isAuthenticated } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
