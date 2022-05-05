import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import { authenticationFormErrorAnimationReducer } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import useSignUp from "./useSignUp";
import useSignUpPageDefaultValues from "./useSignUpPageDefaultValues";

const SignUpPage = () => {
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

  const { signUpMutate, isLoading } = useSignUp(errorAnimationDispatch);

  const signUpHandler = (e: FormEvent) => {
    e.preventDefault();

    signUpMutate(inputState);
  };

  return (
    <AuthenticationForm
      isloading={isLoading}
      fullForm
      submitHandler={signUpHandler}
      inputState={inputState}
      inputDispatch={inputDispatch}
      errorAnimationState={errorAnimationState}
    />
  );
};

export default SignUpPage;
