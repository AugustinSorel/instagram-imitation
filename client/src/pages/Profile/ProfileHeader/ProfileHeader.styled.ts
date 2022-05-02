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
