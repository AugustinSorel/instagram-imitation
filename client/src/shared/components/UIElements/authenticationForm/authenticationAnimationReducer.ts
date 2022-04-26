import { AnimationControls } from "framer-motion";

export enum AuthenticationAnimationActionType {
  SET_EMAIL_ANIMATION,
  SET_PASSWORD_ANIMATION,
  SET_USERNAME_ANIMATION,
  SET_AGE_ANIMATION,
}

export interface AuthenticationFormAction {
  type: AuthenticationAnimationActionType;
  payload: string;
}

export interface AuthenticationAnimationState {
  errorMessage: string;
  emailAnimation: AnimationControls;
  passwordAnimation: AnimationControls;
  usernameAnimation?: AnimationControls;
  ageAnimation?: AnimationControls;
}

export const authenticationAnimationReducer = (
  state: AuthenticationAnimationState,
  action: AuthenticationFormAction
): AuthenticationAnimationState => {
  const { type, payload } = action;

  switch (type) {
    case AuthenticationAnimationActionType.SET_EMAIL_ANIMATION:
      state.emailAnimation.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    case AuthenticationAnimationActionType.SET_PASSWORD_ANIMATION:
      state.passwordAnimation.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    case AuthenticationAnimationActionType.SET_USERNAME_ANIMATION:
      state.usernameAnimation?.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    case AuthenticationAnimationActionType.SET_AGE_ANIMATION:
      state.ageAnimation?.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
