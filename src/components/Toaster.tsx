import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { create } from "zustand";

type Toast = { id: string; text: string };

type UseToaster = {
  addToast: (text: Toast["text"]) => void;
  deleteToast: (id: Toast["id"]) => void;
  toasts: Toast[];
};

export const useToaster = create<UseToaster>((set, _) => {
  return {
    toasts: [],
    addToast: (text) => {
      set((state) => ({
        toasts: [...state.toasts, { id: uuidv4(), text: text }],
      }));
    },
    deleteToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    },
  };
});

const Toast = ({ toast }: { toast: Toast }) => {
  const deleteToast = useToaster((state) => state.deleteToast);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsClosing(() => true);
    }, 3_000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const onAnimationEndHandler = () => {
    if (isClosing) {
      deleteToast(toast.id);
    }
  };

  return (
    <div
      className="flex animate-toaster-in gap-5 rounded-md border border-black/20 bg-white/40 px-5 py-2 capitalize text-slate-600 backdrop-blur-md transition-all data-[active=false]:animate-fade-out"
      data-active={!isClosing}
      onAnimationEnd={onAnimationEndHandler}
    >
      {toast.text}
    </div>
  );
};

export const Toaster = () => {
  const toasts = useToaster((state) => state.toasts);

  if (toasts.length < 1) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-0 z-50 mt-5 -translate-x-1/2 space-y-1">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
