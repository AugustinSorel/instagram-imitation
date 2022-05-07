import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { Svg, SvgContainer } from "./SvgIcon.styled";
import { Transition } from "framer-motion";

interface Props {
  path: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  inverseColor?: boolean;
  nonClickable?: boolean;
  layout?: boolean;
  transition?: Transition;
}

const SvgIcon: FC<Props> = ({
  path,
  inverseColor,
  nonClickable,
  layout,
  transition,
  ...rest
}) => {
  return (
    <SvgContainer
      whileHover={{ ...(!nonClickable && { ...scaleUp }) }}
      whileTap={{ ...(!nonClickable && { ...scaleDown }) }}
      layout={layout}
      transition={transition}
    >
      <Svg
        viewBox="0 0 24 24"
        $inverseColor={inverseColor}
        $nonClickable={nonClickable}
        {...rest}
      >
        <path d={path} />
      </Svg>
    </SvgContainer>
  );
};

export default SvgIcon;
