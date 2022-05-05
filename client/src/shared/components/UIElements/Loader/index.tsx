import { AnimatePresence, Variants } from "framer-motion";
import loaderVariants from "../../../framerMotion/loaderVariants";
import { LoaderStyle } from "./Loader.styled";

type Props = {};

const Loader = (props: Props) => {
  return (
    <AnimatePresence initial>
      <LoaderStyle
        variants={loaderVariants}
        animate="animate"
        initial="initial"
      />
    </AnimatePresence>
  );
};

export default Loader;
