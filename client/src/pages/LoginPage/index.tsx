import { useAnimation } from "framer-motion";
import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import {
  AuthenticationAnimationActionType,
  authenticationAnimationReducer,
} from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const defaultLoginDetails = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultLoginDetails
  );

  const [animationState, animationDispatch] = useReducer(
    authenticationAnimationReducer,
    {
      errorMessage: "",
      emailAnimation: useAnimation(),
      passwordAnimation: useAnimation(),
    }
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
