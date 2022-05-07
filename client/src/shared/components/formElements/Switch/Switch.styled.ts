import { motion } from "framer-motion";
import styled from "styled-components";

interface Props {
  $isOn: boolean;
}

export const SwitchContainer = styled(motion.div)<Props>`
  width: 75px;
  height: 40px;
  padding: 0.5rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: ${({ $isOn }) => ($isOn ? "flex-end" : "flex-start")};

  border-radius: 50px;
  background-color: var(--accent-color);
  border: var(--border-height) solid var(--color);
`;
