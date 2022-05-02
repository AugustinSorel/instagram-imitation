import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderTitleContainer = styled.li`
  flex: 1;

  @media screen and (max-width: 768px) {
    flex: 0;
  }
`;

export const HeaderTitleStyle = styled(Link)`
  font-size: var(--font-size-meduim);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
  color: inherit;
  text-decoration: none;
`;
