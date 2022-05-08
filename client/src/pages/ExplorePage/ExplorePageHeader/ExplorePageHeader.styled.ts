import styled from "styled-components";

export const ExplorePageHeaderContainer = styled.div`
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

export const ExplorePageHeaderTitle = styled.h2`
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;

  flex: 1;
`;
