import { FormEvent, useReducer } from "react";
import { useMutation } from "react-query";
import { createUser } from "../../shared/api/userApi";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import {
  AuthenticationErrorAnimationActionType,
  authenticationFormErrorAnimationReducer,
} from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import useSignUpPageDefaultValues from "./useSignUpPageDefaultValues";

const SignUpPage = () => {
  const { mutate: signUpMutate } = useMutation(createUser, {
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      const { message, field } = error.response.data;

      const type = () => {
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

      errorAnimationDispatch({
        type: type(),
        payload: message,
      });
    },
  });

  const { defaultSignUErrorAnimation, defaultSignUpDetails } =
    useSignUpPageDefaultValues();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultSignUpDetails
  );

  const [errorAnimationState, errorAnimationDispatch] = useReducer(
    authenticationFormErrorAnimationReducer,
    defaultSignUErrorAnimation
  );

  const signUpHandler = (e: FormEvent) => {
    e.preventDefault();

    signUpMutate(inputState);
  };

  return (
    <AuthenticationForm
      isSignUp
      submitHandler={signUpHandler}
      inputState={inputState}
      inputDispatch={inputDispatch}
      errorAnimationState={errorAnimationState}
    />
  );
};

export default SignUpPage;
