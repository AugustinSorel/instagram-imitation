import { useMutation } from "react-query";
import useProfileModal from "../../pages/Profile/ProfileModal/useProfileModal";
import { logoutUser } from "../api/userApi";
import useUser from "../store/useUser";

const useLogout = () => {
  const { setIsAuthenticated } = useUser();
  const { close } = useProfileModal();

  const { mutate: logoutMutation } = useMutation(logoutUser, {
    onSuccess: () => {
      close();
    },
    onError: (error: any) => {
      console.log("Error in logout mutation", error);
    },
    onSettled: () => {
      setIsAuthenticated(false);
    },
  });

  return logoutMutation;
};

export default useLogout;
