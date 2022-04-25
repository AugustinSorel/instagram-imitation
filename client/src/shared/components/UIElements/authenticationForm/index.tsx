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

interface Props {
  isSignUp: boolean;
  navigationLink: string;
  navigationText: string;
  navigationTextBody: string;
}

const AuthenticationForm: FC<Props> = ({
  isSignUp,
  navigationLink,
  navigationText,
  navigationTextBody,
}) => {
  return (
    <AuthenticationFormContainer>
      <AuthenticationFormBody>
        <AuthenticationFormTitle>instagram</AuthenticationFormTitle>

        <AuthenticationFormStyle>
          {isSignUp && <Input placeholder="name" />}
          <Input placeholder="email" />
          {isSignUp && <Input placeholder="age" />}
          <Input placeholder="password" />
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
