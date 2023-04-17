import type { ComponentProps, PropsWithChildren } from "react";
import Backdrop from "./Backdrop";
import { SvgIcon } from "./SvgIcon";

type Props = {
  backdropProps: ComponentProps<typeof Backdrop>;
} & PropsWithChildren;

export const BottomSheet = ({ children, backdropProps }: Props) => {
  return (
    <Backdrop {...backdropProps}>
      <div
        aria-expanded={backdropProps.isExpanded}
        className="relative h-full w-full animate-drop-in-from-bottom overflow-auto bg-white/70 p-5 after:absolute after:left-1/2 after:right-0 after:top-0 after:mt-3 after:hidden after:h-0.5 after:w-48 after:-translate-x-1/2 after:rounded-full after:bg-black/20 aria-[expanded=false]:animate-drop-out-from-bottom dark:bg-black/70 dark:fill-slate-300 dark:after:bg-white/20 lg:mx-auto lg:mt-auto lg:h-auto lg:max-h-[75%] lg:w-full lg:max-w-[75%] lg:rounded-md lg:after:block"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Close Modal"
          className="absolute right-3 top-3 flex aspect-square h-8 items-center justify-center rounded-md border border-black/10 bg-black/5 fill-slate-600 p-1 duration-300 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:fill-current dark:hover:bg-white/10 lg:hidden"
          onClick={backdropProps.clickHandler}
        >
          <SvgIcon svgName="close" />
        </button>

        {children}
      </div>
    </Backdrop>
  );
};
