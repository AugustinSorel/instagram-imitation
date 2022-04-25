import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";

const LoginPage = () => {
  return (
    <AuthenticationForm
      isSignUp={false}
      navigationLink={"/sign-up"}
      navigationText={"Sign up"}
      navigationTextBody={"Don't have an account? "}
    />
  );
};

export default LoginPage;
