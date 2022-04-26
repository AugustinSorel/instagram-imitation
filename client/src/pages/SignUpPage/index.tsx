import { useAnimation } from "framer-motion";
import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const defaultSignUpDetails = {
  userName: "",
  email: "",
  age: "",
  password: "",
};

const SignUpPage = () => {
  const usernameAnimation = useAnimation();
  const emailAnimation = useAnimation();
  const passwordAnimation = useAnimation();
  const ageAnimation = useAnimation();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultSignUpDetails
  );

  const signUpHandler = (e: FormEvent) => {
    e.preventDefault();

    usernameAnimation.start("animate");

    console.log("Sign up state: ", inputState);
  };

  return (
    <AuthenticationForm
      isSignUp
      navigationLink="/login"
      navigationText="Login"
      navigationTextBody={"Already have an account? "}
      submitHandler={signUpHandler}
      inputState={inputState}
      inputDispatch={inputDispatch}
      usernameAnimation={usernameAnimation}
      emailAnimation={emailAnimation}
      passwordAnimation={passwordAnimation}
      ageAnimation={ageAnimation}
    />
  );
};

export default SignUpPage;
