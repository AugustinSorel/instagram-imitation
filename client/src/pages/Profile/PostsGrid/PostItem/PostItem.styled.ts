import { motion } from "framer-motion";
import styled from "styled-components";

export const PostItemContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const PostItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const PostItemBackdrop = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: #000000aa;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;
