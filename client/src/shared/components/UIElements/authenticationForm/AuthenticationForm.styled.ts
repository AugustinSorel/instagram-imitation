import styled from "styled-components";
import { Card } from "../../../styles/UIElements.styled";

export const AuthenticationFormContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthenticationFormTitle = styled.h1`
  font-size: var(--font-size-extra-large);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
  text-align: center;
`;

export const AuthenticationFormCard = styled.div`
  ${Card}

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
