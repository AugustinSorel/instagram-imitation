import styled from "styled-components";

export const ProfileModalContainer = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: var(--border-radius);

  display: flex;
  flex-direction: column;

  & > svg:first-child {
    flex: 1;
    align-self: flex-end;
  }
`;

export const ProfileModalAvatar = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  align-self: center;
`;
