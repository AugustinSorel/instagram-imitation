import styled from "styled-components";

export const ProfileModalContainer = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: var(--border-radius);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > svg:first-child {
    flex: 1;
    align-self: flex-end;
  }
`;

export const ImagePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
`;

export const ProfileModalAvatar = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  align-self: center;
`;

export const FilePickerInput = styled.input`
  opacity: 0;

  position: absolute;

  height: 100%;
  width: 100%;
  background-color: red;
`;
