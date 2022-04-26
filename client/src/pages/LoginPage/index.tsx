import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import {
  AuthenticationErrorAnimationActionType,
  authenticationFormErrorAnimationReducer,
} from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import useLoginPageDefaultValues from "./useLoginPageDefaultValues";

const LoginPage = () => {
  const { defaultLoginErrorAnimation, defaultLoginDetails } =
    useLoginPageDefaultValues();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultLoginDetails
  );

  const [animationState, animationDispatch] = useReducer(
    authenticationFormErrorAnimationReducer,
    defaultLoginErrorAnimation
  );

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();

    animationDispatch({
      type: AuthenticationErrorAnimationActionType.START_PASSWORD_ANIMATION,
      payload: "LOL",
    });

    console.log("state:", inputState);
  };

  return (
    <AuthenticationForm
      isSignUp={false}
      submitHandler={loginHandler}
      inputState={inputState}
      inputDispatch={inputDispatch}
      errorAnimationState={animationState}
    />
  );
};

export default LoginPage;
