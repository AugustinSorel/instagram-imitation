import { AnimationControls } from "framer-motion";

export enum AuthenticationErrorAnimationActionType {
  START_EMAIL_ANIMATION,
  START_PASSWORD_ANIMATION,
  START_USERNAME_ANIMATION,
  START_AGE_ANIMATION,
}

export interface AuthenticationFormAction {
  type: AuthenticationErrorAnimationActionType;
  payload: string;
}

export interface AuthenticationErrorAnimationState {
  errorMessage: string;
  emailAnimation: AnimationControls;
  passwordAnimation: AnimationControls;
  usernameAnimation?: AnimationControls;
  ageAnimation?: AnimationControls;
}

export const authenticationFormErrorAnimationReducer = (
  state: AuthenticationErrorAnimationState,
  action: AuthenticationFormAction
): AuthenticationErrorAnimationState => {
  const { type, payload } = action;

  switch (type) {
    case AuthenticationErrorAnimationActionType.START_EMAIL_ANIMATION:
      state.emailAnimation.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    case AuthenticationErrorAnimationActionType.START_PASSWORD_ANIMATION:
      state.passwordAnimation.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    case AuthenticationErrorAnimationActionType.START_USERNAME_ANIMATION:
      state.usernameAnimation?.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    case AuthenticationErrorAnimationActionType.START_AGE_ANIMATION:
      state.ageAnimation?.start("animate");
      return {
        ...state,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
