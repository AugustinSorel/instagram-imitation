import { AuthenticationErrorAnimationActionType } from "../components/UIElements/authenticationForm/authenticationAnimationReducer";

const getAuthenticationErrorEnum = (field: string) => {
  if (field === "username") {
    return AuthenticationErrorAnimationActionType.START_USERNAME_ANIMATION;
  }

  if (field === "email") {
    return AuthenticationErrorAnimationActionType.START_EMAIL_ANIMATION;
  }

  if (field === "age") {
    return AuthenticationErrorAnimationActionType.START_AGE_ANIMATION;
  }

  return AuthenticationErrorAnimationActionType.START_PASSWORD_ANIMATION;
};

export default getAuthenticationErrorEnum;
