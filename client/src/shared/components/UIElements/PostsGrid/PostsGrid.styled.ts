import { motion } from "framer-motion";
import styled from "styled-components";

export const PostsGridContainer = styled(motion.div)`
  padding: 1rem;
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
