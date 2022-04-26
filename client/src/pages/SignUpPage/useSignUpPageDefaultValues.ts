import { useAnimation } from "framer-motion";
import { AuthenticationAnimationState } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { AuthenticationFormState } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const useSignUpPageDefaultValues = () => {
  const defaultSignUpDetails: AuthenticationFormState = {
    userName: "",
    email: "",
    age: "",
    password: "",
  };

  const defaultSignUpAnimation: AuthenticationAnimationState = {
    errorMessage: "",
    emailAnimation: useAnimation(),
    passwordAnimation: useAnimation(),
    usernameAnimation: useAnimation(),
    ageAnimation: useAnimation(),
  };

  return { defaultSignUpDetails, defaultSignUpAnimation };
};

export default useSignUpPageDefaultValues;
