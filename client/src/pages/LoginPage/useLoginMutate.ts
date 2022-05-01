import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../shared/api/userApi";
import { AuthenticationFormAction } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import useUser from "../../shared/store/useUser";
import getAuthenticationErrorEnum from "../../shared/utils/getAuthenticationErrorEnum";

const useLoginMutate = (
  animationDispatch: React.Dispatch<AuthenticationFormAction>
) => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUser();

  const successHandler = (data: any) => {
    navigate("/");
    setIsAuthenticated(true);
  };

  const errorHandler = (error: any) => {
    setIsAuthenticated(false);

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
