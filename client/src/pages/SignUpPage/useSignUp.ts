import { useMutation } from "react-query";
import { createUser } from "../../shared/api/userApi";
import { AuthenticationErrorAnimationActionType } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";

const getAuthenticationErrorEnum = (field: string) => {
  if (field === "username") {
    return AuthenticationErrorAnimationActionType.START_USERNAME_ANIMATION;
  }

  if (field === "email") {
    return AuthenticationErrorAnimationActionType.START_EMAIL_ANIMATION;
  }

  if (field === "age") {
    return AuthenticationErrorAnimationActionType.START_AGE_ANIMATION;
  }

  return AuthenticationErrorAnimationActionType.START_PASSWORD_ANIMATION;
};

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
