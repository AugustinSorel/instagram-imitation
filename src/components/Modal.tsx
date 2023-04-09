import { type ComponentProps } from "react";
import Backdrop from "./Backdrop";

const Modal = (props: ComponentProps<typeof Backdrop>) => {
  const { children, componentControl } = props;

  return (
    <Backdrop componentControl={componentControl}>
      <div
        className="h-full w-full overflow-auto bg-white/70 p-5 backdrop-blur-sm lg:h-auto lg:max-h-[90%] lg:w-auto lg:max-w-[75%] lg:rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Close Modal"
          className="absolute right-3 top-3 flex aspect-square h-8 items-center justify-center rounded-md border border-black/10 bg-white/20 fill-slate-600 p-1 duration-300 hover:bg-white/40 lg:hidden"
          onClick={componentControl.triggerClosingAnimation}
        >
          <svg viewBox="-1 0 24 24" xmlns="http://www.w2.org/2000/svg">
            <path d="m11 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
          </svg>
        </button>
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
