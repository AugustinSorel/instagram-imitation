import styled from "styled-components";

export const ProfileContainer = styled.div`
  overflow: auto;
`;

export const Grid = styled.div`
  padding: 0 1rem;
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const GridItem = styled.div`
  background-color: red;
  aspect-ratio: 1;
`;
