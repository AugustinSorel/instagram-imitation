import { FC } from "react";
import UserForm from "../UserForm";
import { AuthenticationErrorAnimationState } from "./authenticationAnimationReducer";
import {
  AuthenticationFormCard,
  AuthenticationFormContainer,
  AuthenticationFormTitle,
} from "./AuthenticationForm.styled";
import AuthenticationFormNavigation from "./AuthenticationFormNavigation";
import { AuthenticationFormState } from "./AuthenticationReducer";

interface Props {
  fullForm: boolean;
  isloading?: boolean;
  inputState: AuthenticationFormState;
  inputDispatch: React.Dispatch<any>;

  errorAnimationState: AuthenticationErrorAnimationState;

  submitHandler: (e: React.FormEvent) => void;
}

const AuthenticationForm: FC<Props> = ({
  fullForm,
  isloading,

  inputState,
  inputDispatch,

  errorAnimationState,

  submitHandler,
}) => {
  return (
    <AuthenticationFormContainer>
      <AuthenticationFormCard>
        <AuthenticationFormTitle>instagram</AuthenticationFormTitle>
        <UserForm
          isLoading={isloading}
          fullForm={fullForm}
          submitHandler={submitHandler}
          inputDispatch={inputDispatch}
          inputState={inputState}
          errorAnimationState={errorAnimationState}
        />
      </AuthenticationFormCard>

      <AuthenticationFormNavigation fullForm={fullForm} />
    </AuthenticationFormContainer>
  );
};

export default AuthenticationForm;
