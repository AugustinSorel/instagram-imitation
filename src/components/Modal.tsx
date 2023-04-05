import { type PropsWithChildren, useState } from "react";
import { createPortal } from "react-dom";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const triggerClosingAnimation = () => {
    setIsClosing(() => true);
  };

  const open = () => {
    setIsOpen(() => true);
  };

  const close = () => {
    setIsOpen(() => false);
    setIsClosing(() => false);
  };

  return {
    isOpen,
    open,
    close,
    triggerClosingAnimation,
    isClosing,
  };
};

type Props = PropsWithChildren &
  Pick<
    ReturnType<typeof useModal>,
    "isClosing" | "close" | "triggerClosingAnimation"
  >;

const Modal = (props: Props) => {
  const { children, isClosing, close, triggerClosingAnimation } = props;
  const container = document.querySelector("#__next");

  if (!container) {
    return null;
  }

  return createPortal(
    <div
      aria-modal={true}
      aria-expanded={!isClosing}
      className="fixed inset-0 z-30 flex animate-fade-in flex-col items-center justify-center bg-black/50 backdrop-blur-sm aria-[expanded=false]:animate-fade-out"
      onClick={triggerClosingAnimation}
      onAnimationEnd={() => {
        if (isClosing) {
          close();
        }
      }}
    >
      {children}
    </div>,
    container
  );
};

export default Modal;
