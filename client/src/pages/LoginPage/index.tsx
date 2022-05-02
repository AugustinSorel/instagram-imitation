import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import { authenticationFormErrorAnimationReducer } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import useLoginMutate from "./useLoginMutate";
import useLoginPageDefaultValues from "./useLoginPageDefaultValues";

const LoginPage = () => {
  const { defaultLoginErrorAnimation, defaultLoginDetails } =
    useLoginPageDefaultValues();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultLoginDetails
  );

  const [errorAnimationState, animationDispatch] = useReducer(
    authenticationFormErrorAnimationReducer,
    defaultLoginErrorAnimation
  );

  const loginMutate = useLoginMutate(animationDispatch);

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();

    loginMutate(inputState);
  };

  return (
    <AuthenticationForm
      fullForm={false}
      submitHandler={loginHandler}
      inputState={inputState}
      inputDispatch={inputDispatch}
      errorAnimationState={errorAnimationState}
    />
  );
};

export default LoginPage;
