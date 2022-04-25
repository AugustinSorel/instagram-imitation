import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../../../styles/UIElements.styled";

export const AuthenticationFormContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthenticationFormBody = styled.main`
  ${Card}

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const AuthenticationFormTitle = styled.h1`
  font-size: var(--font-size-extra-large);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
  text-align: center;
`;

export const AuthenticationFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AuthenticationFormNavigation = styled.nav`
  ${Card}

  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
`;

export const AuthenticationFormNavigationLink = styled(Link)`
  color: var(--call-to-action-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
