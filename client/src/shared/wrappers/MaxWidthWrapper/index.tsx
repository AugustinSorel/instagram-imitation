import { MaxWidthWrapperContainer } from "./MaxWidthWrapper.styled";

type Props = {
  children: React.ReactNode;
  center?: boolean;
};

const MaxWidthWrapper = ({ children, center }: Props) => {
  return (
    <MaxWidthWrapperContainer center={center || false}>
      {children}
    </MaxWidthWrapperContainer>
  );
};

export default MaxWidthWrapper;
