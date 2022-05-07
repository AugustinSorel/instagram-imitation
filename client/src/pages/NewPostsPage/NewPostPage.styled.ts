import styled from "styled-components";

export const NewPostContainer = styled.div`
  margin: auto;
`;

export const NewPostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > div:first-child {
    align-self: center;
  }
`;

export const NewPostTitle = styled.h2`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
`;

export const NewPostBrowseInput = styled.input`
  background-color: red;
  display: none;
`;
