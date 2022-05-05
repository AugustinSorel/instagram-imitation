import { motion } from "framer-motion";
import styled from "styled-components";

export const LoaderStyle = styled(motion.div)`
  height: 100%;
  width: 100%;

  border: var(--border-height) solid var(--background);
  border-top: var(--border-height) solid var(--call-to-action-color);
  border-radius: 50%;
`;
