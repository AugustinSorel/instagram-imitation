import useIsMobile from "../../../../hooks/useIsMobile";
import { HeaderTitleContainer, HeaderTitleStyle } from "./HeaderTitle.styled";

const HeaderTitle = () => {
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
