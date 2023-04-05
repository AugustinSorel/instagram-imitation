import { type PropsWithChildren } from "react";
import { Grand_Hotel } from "next/font/google";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image, { type ImageProps } from "next/image";
import Modal, { useExitAnimation } from "./Modal";
import { useRouter } from "next/router";

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

const signoutHandler = () => {
  void signOut();
};

const githubSignin = () => {
  void signIn("github");
};

const googleSignin = () => {
  void signIn("google");
};

const AvatarMenu = () => {
  const { data: session } = useSession();
  const menu = useExitAnimation();
  const router = useRouter();

  return (
    <div
      className="relative z-50"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          menu.triggerClosingAnimation();
        }
      }}
    >
      <button
        onClick={menu.open}
        className="flex aspect-square w-10 items-center justify-center"
        title="Open Menu"
      >
        <Avatar src={session?.user?.image ?? ""} />
      </button>

      {menu.isOpen && (
        <div
          aria-expanded={!menu.isClosing}
          className="absolute right-0 mt-3 flex w-max animate-fade-in flex-col gap-1 overflow-hidden rounded-md border border-black/20 bg-white/10 p-1 backdrop-blur-md aria-[expanded=false]:animate-fade-out"
          onAnimationEnd={menu.animationEndHandler}
        >
          <Link
            aria-current={router.asPath === "/"}
            href={"/"}
            className="rounded-md p-2 capitalize duration-300 hover:bg-black/10 aria-[current=true]:bg-black/10"
          >
            home
          </Link>
          <Link
            aria-current={router.asPath === `/users/${session?.user?.id ?? ""}`}
            href={`/users/${session?.user?.id ?? ""}`}
            className="rounded-md p-2 capitalize duration-300 hover:bg-black/10 aria-[current=true]:bg-black/10"
          >
            profile
          </Link>
          <button className="rounded-md p-2 text-left capitalize duration-300 hover:bg-black/5">
            darkmode
          </button>
          <Link
            aria-current={
              router.asPath ===
              `/users/${session?.user?.id ?? ""}?tab=bookmarked`
            }
            href={`/users/${session?.user?.id ?? ""}?tab=bookmarked`}
            className="rounded-md p-2 capitalize duration-300 hover:bg-black/10 aria-[current=true]:bg-black/10"
          >
            bookmarked
          </Link>
          <Link
            aria-current={
              router.asPath === `/users/${session?.user?.id ?? ""}?tab=liked`
            }
            href={`/users/${session?.user?.id ?? ""}?tab=liked`}
            className="rounded-md p-2 capitalize duration-300 hover:bg-black/5 aria-[current=true]:bg-black/10"
          >
            liked
          </Link>

          <hr className="my-1 border-slate-400" />

          <button
            className="rounded-md p-2 text-left capitalize duration-300 hover:bg-black/10"
            onClick={signoutHandler}
          >
            signout
          </button>
          <button className="rounded-md p-2 text-left capitalize text-red-500 duration-300 hover:bg-red-500/10">
            delete my account
          </button>
        </div>
      )}
    </div>
  );
};

const SignInButton = () => {
  const menu = useExitAnimation();

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          menu.triggerClosingAnimation();
        }
      }}
    >
      <button
        aria-pressed={menu.isOpen}
        className="rounded-md border border-black/10 bg-brand-gradient bg-origin-border px-5 py-2 text-sm font-bold capitalize text-white opacity-75 backdrop-blur-sm duration-300 hover:opacity-100 aria-[pressed=true]:opacity-100"
        onClick={menu.open}
      >
        signin
      </button>

      {menu.isOpen && (
        <div
          aria-expanded={!menu.isClosing}
          className="absolute right-0 mt-3 w-max animate-fade-in overflow-hidden rounded-md border border-black/20 bg-white/10 p-1 font-normal backdrop-blur-md aria-[expanded=false]:animate-fade-out"
          onAnimationEnd={menu.animationEndHandler}
        >
          <button
            className="flex items-center gap-3 rounded-md p-2 duration-300 hover:bg-black/10"
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
            className="flex items-center gap-3 rounded-md p-2 duration-300 hover:bg-black/10"
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
  const modal = useExitAnimation();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <button
        title="Open Menu"
        className="flex aspect-square h-10 items-center justify-center rounded-md border border-black/10 bg-white/20 fill-slate-600 p-2 duration-300 hover:bg-white/40"
        onClick={modal.open}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" />
        </svg>
      </button>

      {modal.isOpen && (
        <Modal
          triggerClosingAnimation={modal.triggerClosingAnimation}
          close={modal.close}
          isClosing={modal.isClosing}
        >
          <nav
            className="flex flex-col gap-1 fill-current capitalize text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              aria-current={router.asPath === "/"}
              href="/"
              className="flex items-center gap-2 rounded-md fill-slate-100 p-2 duration-300 hover:bg-black/10 aria-[current=true]:bg-black/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="aspect-square w-4"
              >
                <path d="M12 9.185l7 6.514v6.301h-3v-5h-8v5h-3v-6.301l7-6.514zm0-2.732l-9 8.375v9.172h7v-5h4v5h7v-9.172l-9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
              </svg>
              home
            </Link>

            <button className="flex items-center gap-2 rounded-md p-2 text-left capitalize duration-300 hover:bg-black/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="aspect-square w-4"
              >
                <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
              </svg>
              search
            </button>

            <button className="flex items-center gap-2 rounded-md p-2 text-left capitalize duration-300 hover:bg-black/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="aspect-square w-4"
              >
                <path d="M10.719 2.082c-2.572 2.028-4.719 5.212-4.719 9.918 0 4.569 1.938 7.798 4.548 9.895-4.829-.705-8.548-4.874-8.548-9.895 0-5.08 3.808-9.288 8.719-9.918zm1.281-2.082c-6.617 0-12 5.383-12 12s5.383 12 12 12c1.894 0 3.87-.333 5.37-1.179-3.453-.613-9.37-3.367-9.37-10.821 0-7.555 6.422-10.317 9.37-10.821-1.74-.682-3.476-1.179-5.37-1.179zm0 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001z" />
              </svg>
              darkmode
            </button>

            {session && (
              <>
                <Link
                  aria-current={router.asPath === `/users/${session?.user?.id}`}
                  href={`/users/${session?.user?.id ?? ""}`}
                  className="flex items-center gap-2 rounded-md fill-slate-100 p-2 duration-300 hover:bg-black/10 aria-[current=true]:bg-black/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="aspect-square w-4"
                  >
                    <path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z" />
                  </svg>
                  profile
                </Link>

                <Link
                  aria-current={
                    router.asPath ===
                    `/users/${session?.user?.id ?? ""}?tab=bookmarked`
                  }
                  href={`/users/${session?.user?.id ?? ""}?tab=bookmarked`}
                  className="flex items-center gap-2 rounded-md fill-slate-100 p-2 duration-300 hover:bg-black/10 aria-[current=true]:bg-black/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="aspect-square w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 2v17.582l-4-3.512-4 3.512v-17.582h8zm2-2h-12v24l6-5.269 6 5.269v-24z" />
                  </svg>
                  bookmarked
                </Link>

                <Link
                  aria-current={
                    router.basePath ===
                    `/users/${session?.user?.id ?? ""}?tab=liked`
                  }
                  href={`/users/${session?.user?.id ?? ""}?tab=liked`}
                  className="flex items-center gap-2 rounded-md fill-slate-100 p-2 duration-300 hover:bg-black/10 aria-[current=true]:bg-black/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="aspect-square w-4"
                  >
                    <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
                  </svg>
                  liked
                </Link>
              </>
            )}

            <hr className="my-2 border-neutral-500" />

            {session ? (
              <>
                <button
                  className="flex items-center gap-2 rounded-md p-2 text-left capitalize duration-300 hover:bg-black/10"
                  onClick={signoutHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="aspect-square w-4"
                  >
                    <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" />
                  </svg>
                  signout
                </button>

                <button className="flex items-center gap-2 rounded-md p-2 text-left capitalize text-red-400 duration-300 hover:bg-red-400/30">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="aspect-square w-4"
                  >
                    <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" />
                  </svg>
                  delete my account
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </nav>
        </Modal>
      )}
    </>
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

const Background = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 1080"
      className="fixed inset-0 -z-50 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id="noise"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="4"
            seed="15"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>
          <feSpecularLighting
            surfaceScale="15"
            specularConstant="1"
            specularExponent="1"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            result="specularLighting"
          >
            <feDistantLight azimuth="3" elevation="100"></feDistantLight>
          </feSpecularLighting>
        </filter>
        <filter
          id="blur"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0.1" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_49_400"
          />
        </filter>
      </defs>

      <g filter="url(#blur)">
        <ellipse cx="1000" cy="300" rx="300" ry="300" fill="#40BAFF" />
        <ellipse cx="700" cy="400" rx="300" ry="300" fill="#FFA4FB" />
        <ellipse cx="500" cy="600" rx="200" ry="200" fill="#AD7FF9" />
      </g>

      <rect
        width="100%"
        height="100%"
        fill="transparent"
        filter="url(#noise)"
        opacity="0.5"
        className="bg-blend-overlay"
      ></rect>

      <pattern
        id="pattern-circles"
        x="0"
        y="0"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
      >
        <circle id="pattern-circle" cx="5" cy="5" r="1" fill="#cccccc"></circle>
      </pattern>

      <rect
        id="rect"
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-circles)"
        opacity="0.5"
      ></rect>
    </svg>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <MobileHeader />

      {children}

      <Background />
    </>
  );
};

export default Layout;
