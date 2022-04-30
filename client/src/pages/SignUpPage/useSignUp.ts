import { useMutation } from "react-query";
import { createUser } from "../../shared/api/userApi";
import getAuthenticationErrorEnum from "../../shared/utils/getAuthenticationErrorEnum";

const useSignUp = (errorAnimationDispatch: any) => {
  const successHandler = (data: any) => {
    console.log(data);
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
