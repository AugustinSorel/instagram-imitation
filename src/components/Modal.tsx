import { type ComponentProps } from "react";
import Backdrop from "./Backdrop";
import { SvgIcon } from "./SvgIcon";

const Modal = (props: ComponentProps<typeof Backdrop>) => {
  const { children, clickHandler, animationEndHandler, isExpanded } = props;

  return (
    <Backdrop
      isExpanded={isExpanded}
      animationEndHandler={animationEndHandler}
      clickHandler={clickHandler}
    >
      <div
        className="relative h-full w-full overflow-auto bg-white/70 p-5 lg:h-auto lg:max-h-[90%] lg:w-auto lg:max-w-[75%] lg:rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Close Modal"
          className="absolute right-3 top-3 flex aspect-square h-8 items-center justify-center rounded-md border border-black/10 bg-white/20 fill-slate-600 p-1 duration-300 hover:bg-white/40 lg:hidden"
          onClick={clickHandler}
        >
          <SvgIcon svgName="close" />
        </button>
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
