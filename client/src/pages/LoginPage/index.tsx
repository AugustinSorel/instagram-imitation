import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
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

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();

    console.log("state:", inputState);
  };

  return (
    <AuthenticationForm
      isSignUp={false}
      navigationLink={"/sign-up"}
      navigationText={"Sign up"}
      navigationTextBody={"Don't have an account? "}
      submitHandler={loginHandler}
      inputState={inputState}
      inputDispatch={inputDispatch}
    />
  );
};

export default LoginPage;
