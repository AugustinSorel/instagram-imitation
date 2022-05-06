import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { Svg } from "./SvgIcon.styled";

interface Props {
  path: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  inverseColor?: boolean;
  nonClickable?: boolean;
}

const SvgIcon: FC<Props> = ({ path, inverseColor, nonClickable, ...rest }) => {
  return (
    <Svg
      whileHover={{ ...(!nonClickable && { ...scaleUp }) }}
      whileTap={{ ...(!nonClickable && { ...scaleDown }) }}
      viewBox="0 0 24 24"
      $inverseColor={inverseColor}
      $nonClickable={nonClickable}
      {...rest}
    >
      <path d={path} />
    </Svg>
  );
};

export default SvgIcon;
