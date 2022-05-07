import { motion } from "framer-motion";
import styled from "styled-components";

export const SvgContainer = styled(motion.div)`
  display: flex;
`;

interface ISvgIconProps {
  $inverseColor?: boolean;
  $nonClickable?: boolean;
}

export const Svg = styled(motion.svg)<ISvgIconProps>`
  fill: ${({ $inverseColor }) =>
    $inverseColor ? "var(--background)" : "var(--color)"};

  width: 24px;
  height: 24px;

  cursor: ${({ $nonClickable }) => ($nonClickable ? "default" : "pointer")};
`;
