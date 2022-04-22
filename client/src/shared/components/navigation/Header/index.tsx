import paths from "../../../utils/paths";
import {
  HeaderContainer,
  HeaderList,
  HeaderNav,
  HeaderTitle,
} from "./Header.styled";
import TabItem from "./TabItem";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderNav>
        <HeaderList>
          <HeaderTitle>HelloWorld</HeaderTitle>
          {Object.keys(paths).map((path) => (
            <TabItem path={path} />
          ))}
        </HeaderList>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
