import { useAnimation } from "framer-motion";
import { AuthenticationErrorAnimationState } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { AuthenticationFormState } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const useLoginPageDefaultValues = () => {
  const defaultLoginDetails: AuthenticationFormState = {
    email: "",
    password: "",
  };

  const defaultLoginErrorAnimation: AuthenticationErrorAnimationState = {
    errorMessage: "",
    emailAnimation: useAnimation(),
    passwordAnimation: useAnimation(),
  };

  return {
    defaultLoginDetails,
    defaultLoginErrorAnimation,
  };
};

export default useLoginPageDefaultValues;
