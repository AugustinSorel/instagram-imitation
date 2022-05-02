import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: var(--accent-color);
  border-bottom: 1px solid var(--border-color);

  @media screen and (max-width: 768px) {
    border-top: 1px solid var(--border-color);
  }
`;

export const HeaderNav = styled.nav``;

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
