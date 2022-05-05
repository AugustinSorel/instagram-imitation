import errorVariants from "../../../framerMotion/errorVariants";
import Button from "../../formElements/Button";
import Input from "../../formElements/input";
import { AuthenticationErrorAnimationState } from "../authenticationForm/authenticationAnimationReducer";
import {
  AuthenticationFormActionType,
  AuthenticationFormState,
} from "../authenticationForm/AuthenticationReducer";
import { UserFormStyle } from "./UserForm.styled";

type Props = {
  fullForm: boolean;
  isLoading?: boolean;

  inputState: AuthenticationFormState;
  inputDispatch: React.Dispatch<any>;

  errorAnimationState: AuthenticationErrorAnimationState;

  submitHandler: (e: React.FormEvent) => void;
};

const UserForm = ({
  fullForm,
  submitHandler,
  inputState,
  inputDispatch,
  errorAnimationState,
  isLoading,
}: Props) => {
  return (
    <UserFormStyle onSubmit={submitHandler}>
      {fullForm && (
        <Input
          variants={errorVariants}
          animate={errorAnimationState.usernameAnimation}
          placeholder="username"
          value={inputState.username}
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
        animate={errorAnimationState.emailAnimation}
        placeholder="email"
        value={inputState.email}
        onChange={(e) =>
          inputDispatch({
            type: AuthenticationFormActionType.CHANGE_EMAIL,
            payload: e.target.value,
          })
        }
      />
      {fullForm && (
        <Input
          variants={errorVariants}
          animate={errorAnimationState.ageAnimation!}
          placeholder="age"
          value={inputState.age}
          onChange={(e) =>
            inputDispatch({
              type: AuthenticationFormActionType.CHANGE_AGE,
              payload: e.target.value,
            })
          }
        />
      )}
      <Input
        type="password"
        variants={errorVariants}
        animate={errorAnimationState.passwordAnimation!}
        placeholder="password"
        value={inputState.password}
        onChange={(e) =>
          inputDispatch({
            type: AuthenticationFormActionType.CHANGE_PASSWORD,
            payload: e.target.value,
          })
        }
      />
      <Button
        text={errorAnimationState.errorMessage || "submit"}
        isLoading={isLoading}
      />
    </UserFormStyle>
  );
};

export default UserForm;
