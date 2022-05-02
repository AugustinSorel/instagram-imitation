import React from "react";
import { BackdropWrapperContainer } from "./BackdropWrapper.styled";

type Props = {
  children: React.ReactNode;
};

const BackdropWrapper = ({ children }: Props) => {
  return (
    <BackdropWrapperContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </BackdropWrapperContainer>
  );
};

export default BackdropWrapper;
