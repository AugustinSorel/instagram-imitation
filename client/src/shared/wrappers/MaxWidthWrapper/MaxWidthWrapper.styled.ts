import styled from "styled-components";

interface Props {
  center: boolean;
}

export const MaxWidthWrapperContainer = styled.div<Props>`
  max-width: var(--max-width);
  margin: ${({ center }) => (center ? "0 auto" : "0")};
`;
