import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormElementsShared } from "../../shared/styles/FormElements.styled";
import { Card } from "../../shared/styles/UIElements.styled";

export const LoginPageContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormContainer = styled.main`
  ${Card}

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const LoginPageTitle = styled.h1`
  font-size: var(--font-size-extra-large);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
  text-align: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BottomTextContainer = styled.div`
  ${Card}
`;

export const BottomText = styled.h2`
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
`;

export const BottomLink = styled(Link)`
  color: var(--call-to-action-color);
  text-decoration: none;
`;
