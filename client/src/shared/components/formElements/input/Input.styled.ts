import { motion } from "framer-motion";
import styled from "styled-components";
import { FormElementsShared } from "../../../styles/FormElements.styled";

export const InputContainer = styled(motion.input)`
  ${FormElementsShared}

  background-color: var(--background);
  border: 1px solid lightgray;
`;
