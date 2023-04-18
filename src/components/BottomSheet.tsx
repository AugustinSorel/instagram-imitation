import type { ComponentProps, PropsWithChildren } from "react";
import Backdrop from "./Backdrop";

type Props = {
  backdropProps: ComponentProps<typeof Backdrop>;
} & PropsWithChildren;

export const BottomSheet = ({ children, backdropProps }: Props) => {
  return (
    <Backdrop {...backdropProps}>
      <div
        aria-expanded={backdropProps.isExpanded}
        className="relative mt-auto flex h-auto max-h-[75%] w-full animate-drop-in-from-bottom flex-col overflow-auto rounded-2xl bg-white/70 p-5 after:absolute after:left-1/2 after:right-0 after:top-0 after:mt-3 after:h-0.5 after:w-48 after:-translate-x-1/2 after:rounded-full after:bg-black/20 aria-[expanded=false]:animate-drop-out-from-bottom dark:bg-black/70 dark:fill-slate-300 dark:after:bg-white/20 lg:mx-auto lg:max-w-[75%]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Backdrop>
  );
};
