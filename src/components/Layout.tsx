//TODO: keyboad navigation
// TODO: reusaable components
// TODO: reusable styles

import { type PropsWithChildren } from "react";
import { Grand_Hotel } from "@next/font/google";
import Link from "next/link";

const SignInButton = () => {
  return (
    <button className="rounded-md border border-white/10 bg-gradient-to-br from-pink-500 to-yellow-500 px-5 py-2 text-sm font-bold capitalize text-white opacity-75 backdrop-blur-sm duration-300 hover:opacity-100">
      signin
    </button>
  );
};

const NewPostButton = ({ className }: { className?: string }) => {
  return (
    <button
      title="Add Post"
      className={`flex aspect-square h-10 items-center justify-center rounded-md border border-black/10 fill-slate-600 p-2 backdrop-blur-sm duration-300 hover:bg-white/40 ${className}`}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" />
      </svg>
    </button>
  );
};

const MenuButton = () => {
  return (
    <button
      title="Add Post"
      className="flex aspect-square h-10 items-center justify-center rounded-md border border-black/10 fill-slate-600 p-2 backdrop-blur-sm duration-300 hover:bg-white/40"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" />
      </svg>
    </button>
  );
};

const QuickSearchButton = () => {
  return (
    <button className="flex w-80 items-center gap-2 rounded-md border border-black/10 p-2 text-sm capitalize text-slate-600 backdrop-blur-sm duration-300 hover:bg-white/40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="aspect-square w-4 fill-current"
      >
        <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
      </svg>
      quick search...
      <kbd className="ml-auto font-sans text-sm capitalize text-slate-400">
        <abbr className="no-underline" title="Control">
          ctrl
        </abbr>{" "}
        k
      </kbd>
    </button>
  );
};

const grandHotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
});

const Title = () => {
  return (
    <Link href={"/"} className="w-max">
      <h1 className={`${grandHotel.className} text-3xl capitalize`}>
        instagram
      </h1>
    </Link>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 hidden bg-white/30 p-5 backdrop-blur-sm lg:block">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center">
        <Title />

        <QuickSearchButton />

        <div className="ml-auto flex gap-2">
          <NewPostButton />
          <SignInButton />
        </div>
      </div>
    </header>
  );
};

const MobileHeader = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 grid grid-cols-[1fr_auto_1fr] justify-items-end rounded-t-3xl bg-red-500 bg-white/30 p-5 backdrop-blur-sm lg:hidden">
      <NewPostButton className="col-start-2 border-white/10 bg-gradient-to-br from-pink-500 to-yellow-500 fill-white opacity-75 hover:opacity-100" />
      <MenuButton />
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <MobileHeader />
      {children}
    </>
  );
};

export default Layout;
