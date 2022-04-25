import { motion } from "framer-motion";
import styled from "styled-components";
import { FormElementsShared } from "../../../styles/FormElements.styled";

export const ButtonContainer = styled(motion.button)`
  ${FormElementsShared}

  background-color: var(--call-to-action-color);
  color: var(--background);
  cursor: pointer;
`;
