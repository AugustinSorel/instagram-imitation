import { useAnimation } from "framer-motion";
import { AuthenticationErrorAnimationState } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { AuthenticationFormState } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const useSignUpPageDefaultValues = () => {
  const defaultSignUpDetails: AuthenticationFormState = {
    userName: "",
    email: "",
    age: "",
    password: "",
  };

  const defaultSignUErrorAnimation: AuthenticationErrorAnimationState = {
    errorMessage: "",
    emailAnimation: useAnimation(),
    passwordAnimation: useAnimation(),
    usernameAnimation: useAnimation(),
    ageAnimation: useAnimation(),
  };

  return { defaultSignUpDetails, defaultSignUErrorAnimation };
};

export default useSignUpPageDefaultValues;
