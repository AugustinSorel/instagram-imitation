import { FC } from "react";
import UserForm from "../UserForm";
import { AuthenticationErrorAnimationState } from "./authenticationAnimationReducer";
import { AuthenticationFormContainer } from "./AuthenticationForm.styled";
import AuthenticationFormNavigation from "./AuthenticationFormNavigation";
import { AuthenticationFormState } from "./AuthenticationReducer";

interface Props {
  fullForm: boolean;
  inputState: AuthenticationFormState;
  inputDispatch: React.Dispatch<any>;

  errorAnimationState: AuthenticationErrorAnimationState;

  submitHandler: (e: React.FormEvent) => void;
}

const AuthenticationForm: FC<Props> = ({
  fullForm,

  inputState,
  inputDispatch,

  errorAnimationState,

  submitHandler,
}) => {
  return (
    <AuthenticationFormContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <UserForm
        fullForm={fullForm}
        submitHandler={submitHandler}
        inputDispatch={inputDispatch}
        inputState={inputState}
        errorAnimationState={errorAnimationState}
      />

      <AuthenticationFormNavigation fullForm={fullForm} />
    </AuthenticationFormContainer>
  );
};

export default AuthenticationForm;
