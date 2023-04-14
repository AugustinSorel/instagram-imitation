import { type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type Props = {
  isExpanded: boolean;
  clickHandler: () => void;
  animationEndHandler: () => void;
} & PropsWithChildren;

const Backdrop = (props: Props) => {
  const { children, isExpanded, clickHandler, animationEndHandler } = props;
  const container = document.querySelector("#__next");

  if (!container) {
    return null;
  }

  return createPortal(
    <div
      aria-modal={true}
      className="fixed inset-0 z-30 flex animate-fade-in flex-col items-center justify-center border border-black/10 bg-black/50 backdrop-blur-md aria-[expanded=false]:animate-fade-out"
      aria-expanded={isExpanded}
      onClick={clickHandler}
      onAnimationEnd={animationEndHandler}
      onKeyDown={(e) => e.code === "Escape" && clickHandler()}
    >
      {children}
    </div>,
    container
  );
};

export default Backdrop;
