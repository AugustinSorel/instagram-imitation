import { Variants } from "framer-motion";

const loaderVariants: Variants = {
  initial: {
    rotate: 0,
  },

  animate: {
    rotate: 360,

    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export default loaderVariants;
