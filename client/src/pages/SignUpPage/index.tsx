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
  const { mutate, data, isLoading } = useMutation(createUser, {
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
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

    // mutate();

    errorAnimationDispatch({
      type: AuthenticationErrorAnimationActionType.START_EMAIL_ANIMATION,
      payload: "LOL",
    });

    console.log("Sign up state: ", inputState);
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
