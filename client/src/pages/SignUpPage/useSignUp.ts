import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../shared/api/userApi";
import { AuthenticationFormAction } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import useUser from "../../shared/store/useUser";
import getAuthenticationErrorEnum from "../../shared/utils/getAuthenticationErrorEnum";

const useSignUp = (
  errorAnimationDispatch: React.Dispatch<AuthenticationFormAction>
) => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUser();

  const successHandler = (data: any) => {
    setIsAuthenticated(true);
    navigate("/");
  };

  const errorHandler = (error: any) => {
    setIsAuthenticated(false);
    const { message, field } = error.response.data;

    errorAnimationDispatch({
      type: getAuthenticationErrorEnum(field),
      payload: message,
    });
  };

  const { mutate: signUpMutate } = useMutation(createUser, {
    onSuccess: successHandler,

    onError: errorHandler,
  });

  return signUpMutate;
};

export default useSignUp;
