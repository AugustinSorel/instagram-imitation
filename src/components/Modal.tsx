import { useRouter } from "next/router";
import { type PropsWithChildren, useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const useExitAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => triggerClosingAnimation();

    router.events.on("routeChangeStart", handleRouteChange);

    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

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

  const animationEndHandler = () => {
    if (isClosing) {
      close();
    }
  };

  return {
    isOpen,
    open,
    close,
    triggerClosingAnimation,
    isClosing,
    animationEndHandler,
  };
};

type Props = PropsWithChildren &
  Pick<
    ReturnType<typeof useExitAnimation>,
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
