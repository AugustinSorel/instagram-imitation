import Button from "../../shared/components/formElements/Button";
import Input from "../../shared/components/formElements/input";
import {
  BottomLink,
  BottomText,
  BottomTextContainer,
  FormContainer,
  LoginForm,
  LoginPageContainer,
  LoginPageTitle,
} from "./LoginPage.styled";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <FormContainer>
        <LoginPageTitle>instagram</LoginPageTitle>

        <LoginForm>
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Button text="submit" />
        </LoginForm>
      </FormContainer>

      <BottomTextContainer>
        <BottomText>
          Don't have an account?{" "}
          <BottomLink to={"/sign-up"}>Sign up</BottomLink>
        </BottomText>
      </BottomTextContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
