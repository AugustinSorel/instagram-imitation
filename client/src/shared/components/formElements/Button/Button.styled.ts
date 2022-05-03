import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { FormElementsShared } from "../../../styles/FormElements.styled";

const ButtonShare = css`
  cursor: pointer;
  text-transform: capitalize;
`;

export const ButtonContainer = styled(motion.button)`
  ${FormElementsShared}
  ${ButtonShare}

  background-color: var(--call-to-action-color);
  color: var(--background);
`;

interface TextButtonProps {
  color?: string;
}

export const TextButtonContainer = styled(motion.button)<TextButtonProps>`
  ${FormElementsShared}
  ${ButtonShare}

  color: ${({ color }) => color || "var(--call-to-action-color)"};
  background-color: transparent;
`;
