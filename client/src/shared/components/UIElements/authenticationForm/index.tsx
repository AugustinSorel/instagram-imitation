import { FC } from "react";
import errorVariants from "../../../framerMotion/errorVariants";
import Button from "../../formElements/Button";
import Input from "../../formElements/input";
import { AuthenticationErrorAnimationState } from "./authenticationAnimationReducer";
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
  inputState: AuthenticationFormState;
  inputDispatch: React.Dispatch<any>;

  errorAnimationState: AuthenticationErrorAnimationState;

  submitHandler: (e: React.FormEvent) => void;
}

const AuthenticationForm: FC<Props> = ({
  isSignUp,

  inputState,
  inputDispatch,

  errorAnimationState: animationState,

  submitHandler,
}) => {
  return (
    <AuthenticationFormContainer>
      <AuthenticationFormBody>
        <AuthenticationFormTitle>instagram</AuthenticationFormTitle>

        <AuthenticationFormStyle onSubmit={submitHandler}>
          {isSignUp && (
            <Input
              variants={errorVariants}
              animate={animationState.usernameAnimation}
              placeholder="username"
              value={inputState.userName as string}
              onChange={(e) =>
                inputDispatch({
                  type: AuthenticationFormActionType.CHANGE_USERNAME,
                  payload: e.target.value,
                })
              }
            />
          )}
          <Input
            variants={errorVariants}
            animate={animationState.emailAnimation}
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
              variants={errorVariants}
              animate={animationState.ageAnimation!}
              placeholder="age"
              value={inputState.age as string}
              onChange={(e) =>
                inputDispatch({
                  type: AuthenticationFormActionType.CHANGE_AGE,
                  payload: e.target.value,
                })
              }
            />
          )}
          <Input
            variants={errorVariants}
            animate={animationState.passwordAnimation!}
            placeholder="password"
            value={inputState.password}
            onChange={(e) =>
              inputDispatch({
                type: AuthenticationFormActionType.CHANGE_PASSWORD,
                payload: e.target.value,
              })
            }
          />
          <Button text={animationState.errorMessage || "submit"} />
        </AuthenticationFormStyle>
      </AuthenticationFormBody>

      <AuthenticationFormNavigation>
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <AuthenticationFormNavigationLink to={isSignUp ? "/login" : "/sign-up"}>
          {isSignUp ? "Login" : "Sign up"}
        </AuthenticationFormNavigationLink>
      </AuthenticationFormNavigation>
    </AuthenticationFormContainer>
  );
};

export default AuthenticationForm;
