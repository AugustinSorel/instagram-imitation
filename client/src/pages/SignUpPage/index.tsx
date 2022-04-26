import { useAnimation } from "framer-motion";
import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import {
  AuthenticationAnimationActionType,
  authenticationAnimationReducer,
} from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const defaultSignUpDetails = {
  userName: "",
  email: "",
  age: "",
  password: "",
};

const SignUpPage = () => {
  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultSignUpDetails
  );

  const [animationState, animationDispatch] = useReducer(
    authenticationAnimationReducer,
    {
      errorMessage: "",
      emailAnimation: useAnimation(),
      passwordAnimation: useAnimation(),
      usernameAnimation: useAnimation(),
      ageAnimation: useAnimation(),
    }
  );

  const signUpHandler = (e: FormEvent) => {
    e.preventDefault();

    animationDispatch({
      type: AuthenticationAnimationActionType.SET_PASSWORD_ANIMATION,
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
      animationState={animationState}
    />
  );
};

export default SignUpPage;
