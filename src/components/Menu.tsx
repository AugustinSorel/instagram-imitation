import { type PropsWithChildren } from "react";
import { type useComponentControl } from "./Backdrop";

type Props = {
  componentControl: ReturnType<typeof useComponentControl>;
} & PropsWithChildren;

export const Menu = ({ children, componentControl }: Props) => {
  return (
    <div
      aria-expanded={!componentControl.isClosing}
      className="absolute right-0 mt-3 flex w-max animate-fade-in flex-col gap-1 overflow-hidden rounded-md border border-black/20 bg-white/10 p-1 font-normal backdrop-blur-md aria-[expanded=false]:animate-fade-out"
      onAnimationEnd={componentControl.animationEndHandler}
    >
      {children}
    </div>
  );
};
