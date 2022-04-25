import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";

const SignUpPage = () => {
  return (
    <AuthenticationForm
      isSignUp
      navigationLink="/login"
      navigationText="Login"
      navigationTextBody={"Already have an account? "}
    />
  );
};

export default SignUpPage;
