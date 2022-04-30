import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../shared/api/userApi";
import getAuthenticationErrorEnum from "../../shared/utils/getAuthenticationErrorEnum";

const useSignUp = (errorAnimationDispatch: any) => {
  const navigate = useNavigate();

  const successHandler = (data: any) => {
    navigate("/");
  };

  const errorHandler = (error: any) => {
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
