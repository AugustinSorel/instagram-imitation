import { motion } from "framer-motion";
import styled from "styled-components";

interface ISvgIconProps {
  $inverseColor?: boolean;
}

export const Svg = styled(motion.svg)<ISvgIconProps>`
  fill: ${({ $inverseColor }) =>
    $inverseColor ? "var(--background)" : "var(--color)"};

  width: 24px;
  height: 24px;
  cursor: pointer;
`;
