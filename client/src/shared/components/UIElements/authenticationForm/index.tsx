import { FC } from "react";
import errorVariants from "../../../framerMotion/errorVariants";
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
  inputState: AuthenticationFormState;
  inputDispatch: React.Dispatch<any>;
  submitHandler: (e: React.FormEvent) => void;
}

const AuthenticationForm: FC<Props> = ({
  isSignUp,
  navigationLink,
  navigationText,
  navigationTextBody,
  submitHandler,
  inputState,
  inputDispatch,
}) => {
  return (
    <AuthenticationFormContainer>
      <AuthenticationFormBody>
        <AuthenticationFormTitle>instagram</AuthenticationFormTitle>

        <AuthenticationFormStyle onSubmit={submitHandler}>
          {isSignUp && (
            <Input
              placeholder="username"
              value={inputState.userName || ""}
              onChange={(e) =>
                inputDispatch({
                  type: AuthenticationFormActionType.CHANGE_USERNAME,
                  payload: e.target.value,
                })
              }
            />
          )}

          <Input
            placeholder="email"
            value={inputState.email}
            onChange={(e) =>
              inputDispatch({
                type: AuthenticationFormActionType.CHANGE_EMAIL,
                payload: e.target.value,
              })
            }
          />
          {isSignUp && (
            <Input
              placeholder="age"
              value={inputState.age || ""}
              onChange={(e) =>
                inputDispatch({
                  type: AuthenticationFormActionType.CHANGE_AGE,
                  payload: e.target.value,
                })
              }
            />
          )}
          <Input
            placeholder="password"
            value={inputState.password}
            onChange={(e) =>
              inputDispatch({
                type: AuthenticationFormActionType.CHANGE_PASSWORD,
                payload: e.target.value,
              })
            }
          />
          <Button text={"submit"} />
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
