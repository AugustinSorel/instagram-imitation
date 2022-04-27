import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { Svg } from "./SvgIcon.styled";

interface Props {
  path: string;
}

const SvgIcon: FC<Props> = ({ path }) => {
  return (
    <Svg
      whileHover={{ ...scaleUp }}
      whileTap={{ ...scaleDown }}
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </Svg>
  );
};

export default SvgIcon;
