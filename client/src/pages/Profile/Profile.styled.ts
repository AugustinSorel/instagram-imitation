import styled from "styled-components";

export const ProfileContainer = styled.div`
  overflow: auto;
`;

export const ProfileHeader = styled.header`
  position: sticky;
  top: 0;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--background);

  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ProfileHeaderUsername = styled.h1`
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;

  flex: 1;
`;

export const ProfileHeaderAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Grid = styled.div`
  padding: 0 1rem;
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

export const GridItem = styled.div`
  background-color: red;
  aspect-ratio: 1;
`;
