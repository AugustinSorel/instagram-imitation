import { PageTransitionWrapperContainer } from "./PageTransitionWrapper.styled";

type Props = {
  children: React.ReactNode;
};

const PageTransitionWrapper = ({ children }: Props) => {
  return (
    <PageTransitionWrapperContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </PageTransitionWrapperContainer>
  );
};

export default PageTransitionWrapper;
