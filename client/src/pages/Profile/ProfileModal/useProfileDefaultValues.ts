import { useAnimation } from "framer-motion";
import { useQueryClient } from "react-query";
import { AuthenticationErrorAnimationState } from "../../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { AuthenticationFormState } from "../../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import User from "../../../shared/types/user";

const useProfileDefaultValues = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  const defaultProfileDetails: AuthenticationFormState = {
    username: user.username,
    email: user.email,
    age: user.age.toString(),
    password: user.password,
  };

  const defaultProfileErrorAnimation: AuthenticationErrorAnimationState = {
    errorMessage: "",
    emailAnimation: useAnimation(),
    passwordAnimation: useAnimation(),
    usernameAnimation: useAnimation(),
    ageAnimation: useAnimation(),
  };

  return { defaultProfileDetails, defaultProfileErrorAnimation };
};

export default useProfileDefaultValues;
