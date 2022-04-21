import paths from "../../../utils/paths";
import { HeaderList, HeaderListItem, HeaderListLink } from "./Header.styled";

const Header = () => {
  return (
    <header>
      <nav>
        <HeaderList>
          {Object.keys(paths).map((path) => (
            <HeaderListItem key={path}>
              <HeaderListLink to={paths[path].path}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d={paths[path].inactive} />
                </svg>
              </HeaderListLink>
            </HeaderListItem>
          ))}
        </HeaderList>
      </nav>
    </header>
  );
};

export default Header;
