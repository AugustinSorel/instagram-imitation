export enum AuthenticationFormActionType {
  CHANGE_USERNAME,
  CHANGE_EMAIL,
  CHANGE_AGE,
  CHANGE_PASSWORD,
}

export interface AuthenticationFormAction {
  type: AuthenticationFormActionType;
  payload: string;
}

export interface AuthenticationFormState {
  username?: string;
  email: string;
  age?: string;
  password: string;
}

export const authenticationFormReducer = (
  state: AuthenticationFormState,
  action: AuthenticationFormAction
): AuthenticationFormState => {
  const { type, payload } = action;

  switch (type) {
    case AuthenticationFormActionType.CHANGE_USERNAME:
      return {
        ...state,
        username: payload,
      };

    case AuthenticationFormActionType.CHANGE_EMAIL:
      return {
        ...state,
        email: payload,
      };

    case AuthenticationFormActionType.CHANGE_AGE:
      return {
        ...state,
        age: payload,
      };

    case AuthenticationFormActionType.CHANGE_PASSWORD:
      return {
        ...state,

        password: payload,
      };

    default:
      return state;
  }
};
