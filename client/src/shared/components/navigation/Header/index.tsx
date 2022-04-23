import useIsMobile from "../../../hooks/useIsMobile";
import paths from "../../../utils/paths";
import {
  HeaderContainer,
  HeaderList,
  HeaderNav,
  HeaderTitle,
} from "./Header.styled";
import TabItem from "./TabItem";
import { HeaderListItem } from "./TabItem/TabItem.styled";

const Header = () => {
  const isMobile = useIsMobile();

  const GetHeaderTitle = () => {
    if (!isMobile) {
      return (
        <HeaderListItem>
          <HeaderTitle to={"/"}>instagram clone</HeaderTitle>
        </HeaderListItem>
      );
    }

    return null;
  };

  return (
    <HeaderContainer>
      <HeaderNav>
        <HeaderList>
          <GetHeaderTitle />

          {Object.entries(paths).map(([key, path]) => (
            <TabItem key={key} path={path} />
          ))}
        </HeaderList>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
