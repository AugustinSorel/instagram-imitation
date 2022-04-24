import { Outlet } from "react-router-dom";
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
    return !isMobile ? (
      <HeaderListItem>
        <HeaderTitle to={"/"}>instagram clone</HeaderTitle>
      </HeaderListItem>
    ) : null;
  };

  return (
    <>
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

      <Outlet />
    </>
  );
};

export default Header;
