import { motion } from "framer-motion";
import styled from "styled-components";

export const BackdropWrapperContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: #000000b3;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(5px);

  z-index: 10;
`;
