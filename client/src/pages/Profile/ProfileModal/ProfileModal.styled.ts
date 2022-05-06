import styled from "styled-components";

export const ProfileModalContainer = styled.div`
  padding: 1rem;
  background-color: var(--background);
  border-radius: var(--border-radius);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > svg:first-child {
    flex: 1;
    align-self: flex-end;
  }
`;

export const ProfileModalImagePickerContainer = styled.div`
  width: 200px;
  height: 200px;
  align-self: center;
`;
