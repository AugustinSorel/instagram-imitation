import { FC } from "react";
import Button from "../../formElements/Button";
import Input from "../../formElements/input";
import {
  AuthenticationFormBody,
  AuthenticationFormContainer,
  AuthenticationFormNavigation,
  AuthenticationFormNavigationLink,
  AuthenticationFormStyle,
  AuthenticationFormTitle,
} from "./AuthenticationForm.styled";
import {
  AuthenticationFormActionType,
  AuthenticationFormState,
} from "./AuthenticationReducer";

interface Props {
  isSignUp: boolean;
  navigationLink: string;
  navigationText: string;
  navigationTextBody: string;
  state: AuthenticationFormState;
  dispatch: React.Dispatch<any>;
  submitHandler: (e: React.FormEvent) => void;
}

const AuthenticationForm: FC<Props> = ({
  isSignUp,
  navigationLink,
  navigationText,
  navigationTextBody,
  submitHandler,
  state,
  dispatch,
}) => {
  return (
    <AuthenticationFormContainer>
      <AuthenticationFormBody>
        <AuthenticationFormTitle>instagram</AuthenticationFormTitle>

        <AuthenticationFormStyle onSubmit={submitHandler}>
          {isSignUp && (
            <Input
              placeholder="username"
              value={state.userName || ""}
              onChange={(e) =>
                dispatch({
                  type: AuthenticationFormActionType.CHANGE_USERNAME,
                  payload: e.target.value,
                })
              }
            />
          )}
          <Input
            placeholder="email"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: AuthenticationFormActionType.CHANGE_EMAIL,
                payload: e.target.value,
              })
            }
          />
          {isSignUp && (
            <Input
              placeholder="age"
              value={state.age || ""}
              onChange={(e) =>
                dispatch({
                  type: AuthenticationFormActionType.CHANGE_AGE,
                  payload: e.target.value,
                })
              }
            />
          )}
          <Input
            placeholder="password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: AuthenticationFormActionType.CHANGE_PASSWORD,
                payload: e.target.value,
              })
            }
          />
          <Button text="submit" />
        </AuthenticationFormStyle>
      </AuthenticationFormBody>

      <AuthenticationFormNavigation>
        {navigationTextBody}
        <AuthenticationFormNavigationLink to={navigationLink}>
          {navigationText}
        </AuthenticationFormNavigationLink>
      </AuthenticationFormNavigation>
    </AuthenticationFormContainer>
  );
};

export default AuthenticationForm;
