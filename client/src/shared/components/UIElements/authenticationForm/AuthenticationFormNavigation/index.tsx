import {
  AuthenticationFormNavigationContainer,
  AuthenticationFormNavigationLink,
} from "./AuthenticationFormFooter.styled";

type Props = {
  fullForm: boolean;
};

const AuthenticationFormNavigation = ({ fullForm }: Props) => {
  return (
    <AuthenticationFormNavigationContainer>
      {fullForm ? "Already have an account? " : "Don't have an account? "}
      <AuthenticationFormNavigationLink to={fullForm ? "/login" : "/sign-up"}>
        {fullForm ? "Login" : "Sign up"}
      </AuthenticationFormNavigationLink>
    </AuthenticationFormNavigationContainer>
  );
};

export default AuthenticationFormNavigation;
