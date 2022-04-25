import styled from "styled-components";
import { FormElementsShared } from "../../../styles/FormElements.styled";

export const ButtonContainer = styled.button`
  ${FormElementsShared}

  background-color: var(--call-to-action-color);
  color: var(--background);
  cursor: pointer;
`;
