import styled from "styled-components";
import { Card } from "../../../styles/UIElements.styled";

export const UserFormContainer = styled.div`
  ${Card}

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const UserFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const UserFormTitle = styled.h1`
  font-size: var(--font-size-extra-large);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
  text-align: center;
`;
