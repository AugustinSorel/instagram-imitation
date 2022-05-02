import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../../../../styles/UIElements.styled";

export const AuthenticationFormNavigationContainer = styled.nav`
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
