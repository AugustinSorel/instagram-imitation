import { FormEvent, useReducer } from "react";
import AuthenticationForm from "../../shared/components/UIElements/authenticationForm";
import { authenticationFormErrorAnimationReducer } from "../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import PageTransitionWrapper from "../../shared/components/wrappers/PageTransitionWrapper";
import useLoginMutate from "./useLoginMutate";
import useLoginPageDefaultValues from "./useLoginPageDefaultValues";

const LoginPage = () => {
  const { defaultLoginErrorAnimation, defaultLoginDetails } =
    useLoginPageDefaultValues();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultLoginDetails
  );

  const [errorAnimationState, animationDispatch] = useReducer(
    authenticationFormErrorAnimationReducer,
    defaultLoginErrorAnimation
  );

  const { loginMutate, isLoading } = useLoginMutate(animationDispatch);

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();

    loginMutate(inputState);
  };

  return (
    <PageTransitionWrapper>
      <AuthenticationForm
        isloading={isLoading}
        fullForm={false}
        submitHandler={loginHandler}
        inputState={inputState}
        inputDispatch={inputDispatch}
        errorAnimationState={errorAnimationState}
      />
    </PageTransitionWrapper>
  );
};

export default LoginPage;
