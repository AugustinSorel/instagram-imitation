import { MaxWidthWrapperContainer } from "./MaxWidthWrapper.styled";

type Props = {
  children: React.ReactNode;
};

const MaxWidthWrapper = ({ children }: Props) => {
  return <MaxWidthWrapperContainer>{children}</MaxWidthWrapperContainer>;
};

export default MaxWidthWrapper;
