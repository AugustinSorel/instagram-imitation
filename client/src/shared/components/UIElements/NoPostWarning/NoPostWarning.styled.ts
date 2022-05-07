import styled from "styled-components";

export const NoPostWarningContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > div:first-child {
    align-self: center;
  }
`;

export const NoPostWarningTitle = styled.h2`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;

  text-align: center;
`;
