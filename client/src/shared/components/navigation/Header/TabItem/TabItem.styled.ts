import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderListItem = styled.li`
  position: relative;
`;

export const HeaderListLink = styled(NavLink)`
  display: flex;
  align-items: center;
`;

export const LinkUnderline = styled(motion.div)`
  --circle-size: 5px;

  position: absolute;
  background-color: var(--color);
  border-radius: 50%;
  width: var(--circle-size);
  height: var(--circle-size);
  bottom: -10px;
  left: calc(50% - var(--circle-size) / 2);
`;
