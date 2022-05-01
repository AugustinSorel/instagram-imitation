import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../../store/useUser";

const PrivateRoute = () => {
  const { isAuthenticated } = useUser();

  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user");

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
