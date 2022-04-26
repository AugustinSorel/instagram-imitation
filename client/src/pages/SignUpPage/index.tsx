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
  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultSignUpDetails
  );

  const signUpHandler = (e: FormEvent) => {
    e.preventDefault();

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
    />
  );
};

export default SignUpPage;
