import { Variants } from "framer-motion";

const cardVariants: Variants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      animation: "ease",
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
  },
};

export default cardVariants;
