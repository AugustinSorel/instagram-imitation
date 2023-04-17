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
        className="relative h-full w-full overflow-auto bg-white/70 p-5 dark:bg-black/70 dark:fill-slate-300 dark:text-slate-300 lg:h-auto lg:max-h-[90%] lg:w-auto lg:max-w-[75%] lg:rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Close Modal"
          className="dark:hover:bg-white/10lg:hidden absolute right-3 top-3 flex aspect-square h-8 items-center justify-center rounded-md border border-black/10 bg-white/20 fill-slate-600 p-1 duration-300 hover:bg-white/40 dark:border-white/10 dark:bg-white/5 dark:fill-current dark:hover:bg-white/10"
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
