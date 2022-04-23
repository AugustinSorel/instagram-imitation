import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: var(--accent-color);
  border-bottom: 1px solid lightgray;
`;

export const HeaderNav = styled.nav`
  max-width: 1000px;
  margin: 0 auto;
`;

export const HeaderTitle = styled(Link)`
  font-size: var(--font-size-meduim);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
  color: inherit;
  text-decoration: none;
`;

export const HeaderList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 1rem;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    justify-content: space-around;
  }
`;
