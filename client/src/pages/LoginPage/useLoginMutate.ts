import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../shared/api/userApi";
import { AuthenticationFormAction } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import getAuthenticationErrorEnum from "../../shared/utils/getAuthenticationErrorEnum";

const useLoginMutate = (
  animationDispatch: React.Dispatch<AuthenticationFormAction>
) => {
  const navigate = useNavigate();

  const successHandler = (data: any) => {
    navigate("/");
  };

  const errorHandler = (error: any) => {
    const { message, field } = error.response.data;

    animationDispatch({
      type: getAuthenticationErrorEnum(field),
      payload: message,
    });
  };

  const { mutate: loginMutate } = useMutation(loginUser, {
    onSuccess: successHandler,

    onError: errorHandler,
  });

  return loginMutate;
};

export default useLoginMutate;
