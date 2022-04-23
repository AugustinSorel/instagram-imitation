import { FC } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import theme from "../../../../styles/theme";
import { Path } from "../../../../utils/paths";
import {
  HeaderListItem,
  HeaderListLink,
  LinkUnderline,
} from "./TabItem.styled";

interface Props {
  path: Path;
}

const TabItem: FC<Props> = ({ path: { active, inactive, path } }) => {
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <HeaderListItem>
      <HeaderListLink to={path}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={theme.colors.color}
        >
          <path d={match ? active : inactive} />
        </svg>
      </HeaderListLink>
      {match && <LinkUnderline layoutId="linkUnderline" />}
    </HeaderListItem>
  );
};

export default TabItem;
