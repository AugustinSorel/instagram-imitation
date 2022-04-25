import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const defaultSignUpDetails = {
  name: "",
  email: "",
  age: "",
  password: "",
};

const SignUpPage = () => {
  const [state, dispatch] = useReducer(
    authenticationFormReducer,
    defaultSignUpDetails
  );

  const signUpHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("Sign up state: ", state);
  };

  return (
    <AuthenticationForm
      isSignUp
      navigationLink="/login"
      navigationText="Login"
      navigationTextBody={"Already have an account? "}
      submitHandler={signUpHandler}
      state={state}
      dispatch={dispatch}
    />
  );
};

export default SignUpPage;
