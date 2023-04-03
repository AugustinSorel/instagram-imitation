import { useState, type PropsWithChildren } from "react";
import { Grand_Hotel } from "next/font/google";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image, { type ImageProps } from "next/image";

const Avatar = (props: Pick<ImageProps, "src">) => {
  return (
    <Image
      {...props}
      alt="user profile"
      width={36}
      height={36}
      className="rounded-full"
    />
  );
};

const AvatarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(() => false);
  const { data: session } = useSession();

  const signoutHandler = () => {
    void signOut();
  };

  return (
    <div
      className="relative z-50"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          closeMenu();
        }
      }}
    >
      <button
        onClick={toggleMenu}
        className="flex aspect-square w-10 items-center justify-center"
        title="Open Menu"
      >
        <Avatar src={session?.user?.image ?? ""} />
      </button>
      {isMenuOpen && (
        <div
          aria-expanded={isMenuOpen}
          className="absolute right-0 mt-3 flex w-max flex-col overflow-hidden rounded-md border border-black/20 bg-white/10 p-1 backdrop-blur-md"
        >
          <Link
            href="/profile"
            className="rounded-md p-2 capitalize duration-300 hover:bg-black/5"
          >
            profile
          </Link>
          <button className="rounded-md p-2 text-left capitalize duration-300 hover:bg-black/5">
            darkmode
          </button>
          <Link
            href="/profile?tab=bookmarked"
            className="rounded-md p-2 capitalize duration-300 hover:bg-black/5"
          >
            bookmarked
          </Link>
          <Link
            href="/profile?tab=liked"
            className="rounded-md p-2 capitalize duration-300 hover:bg-black/5"
          >
            liked
          </Link>

          <hr className="my-1 border-slate-400" />

          <button
            className="rounded-md p-2 text-left capitalize duration-300 hover:bg-black/5"
            onClick={signoutHandler}
          >
            signout
          </button>
          <button className="rounded-md p-2 text-left capitalize text-red-500 duration-300 hover:bg-red-500/5">
            delete my account
          </button>
        </div>
      )}
    </div>
  );
};

const SignInButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(() => false);

  const githubSignin = () => {
    void signIn("github");
  };

  const googleSignin = () => {
    void signIn("google");
  };

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          closeMenu();
        }
      }}
    >
      <button
        aria-pressed={isMenuOpen}
        className="rounded-md border border-black/10 bg-brand-gradient bg-origin-border px-5 py-2 text-sm font-bold capitalize text-white opacity-75 backdrop-blur-sm duration-300 hover:opacity-100 aria-[pressed=true]:opacity-100"
        onClick={toggleMenu}
      >
        signin
      </button>

      {isMenuOpen && (
        <div
          aria-expanded={isMenuOpen}
          className="absolute right-0 mt-3 w-max overflow-hidden rounded-md border border-black/20 bg-white/10 p-1 font-normal backdrop-blur-md"
        >
          <button
            className="flex items-center gap-3 rounded-md p-2 duration-300 hover:bg-black/5"
            onClick={githubSignin}
          >
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-square w-4 fill-current"
            >
              <path d="M8.00564 0C3.57819 0 -0.000976562 3.66665 -0.000976562 8.2028C-0.000976562 11.8288 2.29232 14.8981 5.47373 15.9844C5.87148 16.0661 6.01718 15.8079 6.01718 15.5908C6.01718 15.4006 6.00407 14.7488 6.00407 14.0696C3.77682 14.5586 3.31302 13.0918 3.31302 13.0918C2.95508 12.1411 2.42474 11.8968 2.42474 11.8968C1.69576 11.3943 2.47784 11.3943 2.47784 11.3943C3.28647 11.4486 3.71078 12.2363 3.71078 12.2363C4.42648 13.4856 5.57976 13.1326 6.04373 12.9153C6.10994 12.3856 6.32218 12.0189 6.54753 11.8153C4.77114 11.6251 2.90215 10.919 2.90215 7.76813C2.90215 6.8718 3.22009 6.13847 3.72389 5.56814C3.6444 5.36448 3.36595 4.52231 3.80354 3.39515C3.80354 3.39515 4.47958 3.17782 6.00391 4.23715C6.65653 4.05759 7.32956 3.96625 8.00564 3.96548C8.68168 3.96548 9.37084 4.06065 10.0072 4.23715C11.5317 3.17782 12.2078 3.39515 12.2078 3.39515C12.6453 4.52231 12.3667 5.36448 12.2872 5.56814C12.8043 6.13847 13.1091 6.8718 13.1091 7.76813C13.1091 10.919 11.2402 11.6115 9.45049 11.8153C9.74221 12.0733 9.99394 12.5621 9.99394 13.3363C9.99394 14.4363 9.98083 15.3191 9.98083 15.5906C9.98083 15.8079 10.1267 16.0661 10.5243 15.9846C13.7057 14.8979 15.999 11.8288 15.999 8.2028C16.0121 3.66665 12.4198 0 8.00564 0Z" />
            </svg>
            sign in with Github
          </button>
          <button
            className="flex items-center gap-3 rounded-md p-2 duration-300 hover:bg-black/5"
            onClick={googleSignin}
          >
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="aspect-square w-4"
            >
              <path
                d="M8.16211 6.54541V9.64359H12.5555C12.3625 10.64 11.7836 11.4836 10.9154 12.0509L13.5647 14.0654C15.1083 12.6691 15.9989 10.6182 15.9989 8.18185C15.9989 7.61459 15.947 7.06908 15.8504 6.5455L8.16211 6.54541Z"
                fill="#4285F4"
              />
              <path
                d="M3.58762 9.52267L2.99009 9.97093L0.875 11.5854C2.21824 14.1963 4.97131 16 8.16242 16C10.3665 16 12.2143 15.2873 13.565 14.0655L10.9157 12.0509C10.1884 12.5309 9.26072 12.8218 8.16242 12.8218C6.03996 12.8218 4.23665 11.4182 3.59096 9.52729L3.58762 9.52267Z"
                fill="#34A853"
              />
              <path
                d="M0.875642 4.41455C0.31908 5.49087 0 6.70543 0 7.99995C0 9.29447 0.31908 10.509 0.875642 11.5854C0.875642 11.5926 3.59186 9.5199 3.59186 9.5199C3.42859 9.0399 3.33209 8.53085 3.33209 7.99987C3.33209 7.46889 3.42859 6.95983 3.59186 6.47983L0.875642 4.41455Z"
                fill="#FBBC05"
              />
              <path
                d="M8.16259 3.18545C9.36484 3.18545 10.4335 3.59271 11.2869 4.37817L13.6246 2.0873C12.2071 0.792775 10.3667 0 8.16259 0C4.97148 0 2.21824 1.79636 0.875 4.41454L3.59113 6.48C4.23674 4.58907 6.04012 3.18545 8.16259 3.18545Z"
                fill="#EA4335"
              />
            </svg>
            sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

const NewPostButton = ({ className = "" }: { className?: string }) => {
  return (
    <button
      title="Add Post"
      className={`relative flex aspect-square h-10 items-center justify-center overflow-hidden rounded-md border border-black/10 bg-white/20 bg-origin-border fill-slate-600 p-2 duration-300 hover:bg-white/40 ${className}`}
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
      title="Open Menu"
      className="flex aspect-square h-10 items-center justify-center rounded-md border border-black/10 bg-white/20 fill-slate-600 p-2 duration-300 hover:bg-white/40"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" />
      </svg>
    </button>
  );
};

const QuickSearchButton = () => {
  return (
    <button className="relative flex w-80 items-center gap-2 rounded-md border border-black/10 bg-white/20 p-2 text-sm capitalize text-slate-600 duration-300 hover:bg-white/40">
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
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 hidden p-5 after:absolute after:inset-0 after:-z-10 after:bg-white/30 after:backdrop-blur-sm lg:block">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center">
        <Title />

        <QuickSearchButton />

        <div className="ml-auto flex items-center gap-2">
          <NewPostButton />
          {session ? <AvatarMenu /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
};

const MobileHeader = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 grid grid-cols-[1fr_auto_1fr] justify-items-end rounded-t-3xl bg-red-500 bg-white/30 p-5 backdrop-blur-sm lg:hidden">
      <NewPostButton className="col-start-2 bg-brand-gradient fill-white opacity-75 hover:opacity-100" />
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
