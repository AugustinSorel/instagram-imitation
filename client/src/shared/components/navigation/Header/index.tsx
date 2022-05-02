import { Outlet } from "react-router-dom";
import paths from "../../../utils/paths";
import MaxWidthWrapper from "../../../wrappers/MaxWidthWrapper";
import { HeaderContainer, HeaderList, HeaderNav } from "./Header.styled";
import HeaderTitle from "./HeaderTitle";
import TabItem from "./TabItem";

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <MaxWidthWrapper center>
          <HeaderNav>
            <HeaderList>
              <HeaderTitle />

              {Object.entries(paths).map(([key, path]) => (
                <TabItem key={key} path={path} />
              ))}
            </HeaderList>
          </HeaderNav>
        </MaxWidthWrapper>
      </HeaderContainer>

      <Outlet />
    </>
  );
};

export default Header;
