import type { PropsWithChildren, ComponentProps } from "react";
import Backdrop from "./Backdrop";
import { SvgIcon } from "./SvgIcon";
import { Button } from "./ui/button";

type Props = {
  backdropProps: ComponentProps<typeof Backdrop>;
} & PropsWithChildren;

const Modal = ({ backdropProps, children }: Props) => {
  return (
    <Backdrop {...backdropProps}>
      <div
        className="relative m-auto flex h-full w-full flex-col overflow-auto bg-white/70 p-5 dark:bg-black/70 dark:fill-slate-300 dark:text-slate-300 lg:h-auto lg:max-h-[90%] lg:w-auto lg:max-w-[75%] lg:rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          title="Close Modal"
          className="absolute right-3 top-3 lg:hidden"
          size='square'
          onClick={backdropProps.clickHandler}
        >
          <SvgIcon svgName="close" />
        </Button>
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
