import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import {
  AuthenticationAnimationActionType,
  authenticationAnimationReducer,
} from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import useLoginPageDefaultValues from "./useLoginPageDefaultValues";

const LoginPage = () => {
  const { defaultLoginAnimation, defaultLoginDetails } =
    useLoginPageDefaultValues();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultLoginDetails
  );

  const [animationState, animationDispatch] = useReducer(
    authenticationAnimationReducer,
    defaultLoginAnimation
  );

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();

    animationDispatch({
      type: AuthenticationAnimationActionType.SET_PASSWORD_ANIMATION,
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
      animationState={animationState}
    />
  );
};

export default LoginPage;
