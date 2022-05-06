import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { Svg } from "./SvgIcon.styled";

interface Props {
  path: string;
  onClick?: () => void;
  inverseColor?: boolean;
}

const SvgIcon: FC<Props> = ({ path, inverseColor, ...rest }) => {
  return (
    <Svg
      whileHover={{ ...scaleUp }}
      whileTap={{ ...scaleDown }}
      viewBox="0 0 24 24"
      $inverseColor={inverseColor}
      {...rest}
    >
      <path d={path} />
    </Svg>
  );
};

export default SvgIcon;
