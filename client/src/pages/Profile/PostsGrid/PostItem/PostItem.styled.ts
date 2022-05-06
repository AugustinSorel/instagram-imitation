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
  backdrop-filter: blur(5px);

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const PostItemDataContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PostItemDataText = styled.span`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
  color: var(--accent-color);
`;
