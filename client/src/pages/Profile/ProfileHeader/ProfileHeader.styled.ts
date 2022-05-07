import { motion } from "framer-motion";
import styled from "styled-components";

export const ProfileHeaderContainer = styled.header`
  position: sticky;
  top: 0;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--background);

  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
`;

export const ProfileUsername = styled.h1`
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;

  flex: 1;
`;

export const ProfileAvatar = styled(motion.img)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

interface Props {
  isClicked: boolean;
}

export const SwitchContainer = styled.div<Props>`
  width: 160px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 10px;
  cursor: pointer;
  background-color: var(--accent-color);
  border: var(--border-height) solid var(--color);

  justify-content: ${({ isClicked }) =>
    isClicked ? "flex-end" : "flex-start"};
`;

export const SwitchHandle = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: var(--color);
  border-radius: 50%;
`;
