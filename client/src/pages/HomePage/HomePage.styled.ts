import styled from "styled-components";

export const HomePageContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

export const PageContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  overflow: auto;
`;

export const PostCard = styled.div`
  border: 3px solid var(--color);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;
`;

export const PostCardHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const PostCardHeaderTitle = styled.h2`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
  text-transform: capitalize;
  flex: 1;
`;

export const PostCardHeaderAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const PostCardBody = styled.img`
  width: 400px;
`;

export const PostCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostCardFooterDataContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PostCardFooterDataTitle = styled.h3`
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
`;
