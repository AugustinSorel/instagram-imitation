import { motion } from "framer-motion";
import styled from "styled-components";

export const NewPostPageContainer = styled.div`
  flex: 1;
  display: grid;
  place-content: center;
`;

export const NewPostPaddingContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NewPostImagePickerContainer = styled(motion.section)`
  height: 300px;
  width: 300px;

  border: var(--border-height) solid var(--border-color);
  border-radius: var(--border-radius);
  position: relative;
`;

export const NewPostImageTextContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const NewPostImageTitle = styled.h2`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
`;

export const NewPostDescriptionInput = styled(motion.textarea)`
  background-color: var(--border-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  width: 100%;

  border: none;
  outline: none;
  font-family: inherit;
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-small);
  color: inherit;
  resize: none;
`;
