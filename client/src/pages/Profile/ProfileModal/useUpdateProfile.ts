import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../../../shared/api/userApi";
import { AuthenticationFormAction } from "../../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import User from "../../../shared/types/user";
import getAuthenticationErrorEnum from "../../../shared/utils/getAuthenticationErrorEnum";
import useProfileModal from "./useProfileModal";

const useUpdateProfile = (
  errorAnimationDispatch: React.Dispatch<AuthenticationFormAction>
) => {
  const { close } = useProfileModal();
  const queryClient = useQueryClient();

  const successHandler = (updatedUser: User) => {
    queryClient.setQueryData("user", {
      ...(queryClient.getQueryData("user") as User),
      ...(updatedUser as User),
    });
    close();
  };

  const errorHandler = (error: any) => {
    const { field, message } = error.response.data;

    errorAnimationDispatch({
      type: getAuthenticationErrorEnum(field),
      payload: message,
    });
  };

  const settledHandler = () => {
    queryClient.invalidateQueries("user");
  };

  const { mutate: udpateMutate } = useMutation(updateUser, {
    onSuccess: successHandler,
    onError: errorHandler,
    onSettled: settledHandler,
  });

  return udpateMutate;
};

export default useUpdateProfile;
