import type { PropsWithChildren, ComponentProps } from "react";
import Backdrop from "./Backdrop";
import { SvgIcon } from "./SvgIcon";

type Props = {
  backdropProps: ComponentProps<typeof Backdrop>;
} & PropsWithChildren;

const Modal = ({ backdropProps, children }: Props) => {
  return (
    <Backdrop {...backdropProps}>
      <div
        className="relative m-auto h-full w-full overflow-auto bg-white/70 p-5 dark:bg-black/70 dark:fill-slate-300 dark:text-slate-300 lg:h-auto lg:max-h-[90%] lg:w-auto lg:max-w-[75%] lg:rounded-md "
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

export default Modal;
