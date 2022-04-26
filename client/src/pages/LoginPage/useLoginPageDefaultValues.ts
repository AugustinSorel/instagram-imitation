import { useAnimation } from "framer-motion";
import { AuthenticationAnimationState } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { AuthenticationFormState } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";

const useLoginPageDefaultValues = () => {
  const defaultLoginDetails: AuthenticationFormState = {
    email: "",
    password: "",
  };

  const defaultLoginAnimation: AuthenticationAnimationState = {
    errorMessage: "",
    emailAnimation: useAnimation(),
    passwordAnimation: useAnimation(),
  };

  return { defaultLoginDetails, defaultLoginAnimation };
};

export default useLoginPageDefaultValues;
