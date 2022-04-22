import { FC } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import paths from "../../../../utils/paths";
import { HeaderListItem, HeaderListLink } from "./TabItem.styled";

interface Props {
  path: string;
}

const TabItem: FC<Props> = ({ path }) => {
  const resolved = useResolvedPath(paths[path].path);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <HeaderListItem key={path}>
      <HeaderListLink to={paths[path].path}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d={match ? paths[path].active : paths[path].inactive} />
        </svg>
      </HeaderListLink>
    </HeaderListItem>
  );
};

export default TabItem;
