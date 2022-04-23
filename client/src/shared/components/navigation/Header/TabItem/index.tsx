import { FC } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import { Path } from "../../../../utils/paths";
import SvgIcon from "../../../UIElements/SvgIcon";
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

  const getPath = () => {
    return match ? active : inactive;
  };

  const GetLinkUnderline = () => {
    return match && <LinkUnderline layoutId="linkUnderline" />;
  };

  return (
    <HeaderListItem>
      <HeaderListLink to={path}>
        <SvgIcon path={getPath()} />
      </HeaderListLink>

      <GetLinkUnderline />
    </HeaderListItem>
  );
};

export default TabItem;
