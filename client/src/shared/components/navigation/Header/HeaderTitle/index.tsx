import useIsMobile from "../../../../hooks/useIsMobile";
import { HeaderTitleContainer, HeaderTitleStyle } from "./HeaderTitle.styled";

type Props = {};

const HeaderTitle = (props: Props) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return null;
  }

  return (
    <HeaderTitleContainer>
      <HeaderTitleStyle to={"/"}>instagram clone</HeaderTitleStyle>
    </HeaderTitleContainer>
  );
};

export default HeaderTitle;
