import { motion } from "framer-motion";
import styled from "styled-components";

export const PostGridItemContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

export const PostGridItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const PostGridItemBackdrop = styled(motion.div)`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(5px);

  display: flex;
  align-items: center;
  justify-content: space-around;

  & ::after {
    content: "";
    position: absolute;
    inset: 0;

    z-index: -1;
    background-color: var(--color);
    opacity: 0.1;
  }
`;

export const PostGridItemDataContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PostGridItemDataText = styled.span`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
  color: var(--background);
`;
