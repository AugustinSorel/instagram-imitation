import BackdropWrapper from "../BackdropWrapper";
import { ModalWrapperContainer } from "./ModelWrapper.styled";

type Props = {
  children: React.ReactNode;
};

const ModalWrapper = ({ children }: Props) => {
  return (
    <BackdropWrapper>
      <ModalWrapperContainer
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
      >
        {children}
      </ModalWrapperContainer>
    </BackdropWrapper>
  );
};

export default ModalWrapper;
