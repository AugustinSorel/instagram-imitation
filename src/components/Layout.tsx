import { signIn, signOut, useSession } from "next-auth/react";
import { Grand_Hotel } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, FormEvent, PropsWithChildren, UIEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { ZodError, z } from "zod";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { LoadingSpinner } from "./LoadingSpinner";
import { SvgIcon } from "./SvgIcon";
import { Toaster, useToaster } from "./Toaster";
import { create } from "zustand";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Background } from "./ui/background";

export const newPostSchema = z.object({
  location: z
    .string({ required_error: "location is required" })
    .min(1, "location must be at least one character")
    .max(255, "location must be at least 255 characters"),
  description: z
    .string({ required_error: "description is required" })
    .min(1, "location must be at least one character")
    .max(2047, "location must be at least 255 characters"),
  images: z
    .object(
      {
        id: z.string().uuid("image id must be of type uuid"),
        src: z.string().url("image src must be a valid url"),
      },
      { required_error: "minimum of one image is required" }
    )
    .array()
    .min(1, "minimum of one image is allowed")
    .max(5, "maximum of five images is allowed"),
});

const defautltFormErrors = {
  location: "",
  description: "",
  images: "",
};

const defaultFormValues: z.TypeOf<typeof newPostSchema> = {
  location: "",
  description: "",
  images: [],
};

const NewPostForm = ({ successHandler }: { successHandler: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formErrors, setFormErrors] = useState(defautltFormErrors);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const query = api.media.uploadNewPostImageToS3.useMutation();
  const utils = api.useContext();
  const { data: session } = useSession();

  const isFormValid =
    formValues.images.length < 1 ||
    formValues.images.length > 5 ||
    !formValues.location ||
    !formValues.description ||
    isLoading;

  const getImagesUrl = async (imagesURL: string[]) => {
    const urls = [];
    for (const imageURL of imagesURL) {
      const res = await fetch(imageURL);
      const blob = await res.blob();

      const data = await query.mutateAsync({ imageExtension: blob.type });
      urls.push(data.url);

      await fetch(data.preSignedUrl, { method: "PUT", body: blob });
    }

    return urls;
  };

  const newPostMutation = api.post.newPost.useMutation({
    onSuccess: () => {
      setFormValues(defaultFormValues);
      successHandler();
    },

    onError: (error) => {
      setFormErrors({
        location: error.data?.zodError?.fieldErrors["location"]?.at(0) ?? "",
        description:
          error.data?.zodError?.fieldErrors["description"]?.at(0) ?? "",
        images: error.data?.zodError?.fieldErrors["images"]?.at(0) ?? "",
      });
    },

    onMutate: async () => {
      setFormErrors(defautltFormErrors);

      if (!session) {
        return;
      }

      await utils.user.byId.cancel({ id: session.user.id });

      utils.user.byId.setData({ id: session.user.id }, (prev) => {
        if (!prev) {
          return;
        }

        return {
          ...prev,
          _count: {
            posts: prev._count.posts + 1,
          },
        };
      });
    },

    onSettled: () => {
      void utils.post.all.invalidate();
    },
  });

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...Array.from(files).map((file) => ({
          id: uuidv4(),
          src: URL.createObjectURL(file),
        })),
      ],
    }));
  };

  const removeImage = (id: (typeof formValues.images)[number]["id"]) => {
    setFormValues((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.id !== id),
    }));
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      newPostSchema.parse(formValues);
      setIsLoading(() => true);
      const imagesSrc = formValues.images.map((image) => image.src);
      const imagesUrl = await getImagesUrl(imagesSrc);
      newPostMutation.mutate({ ...formValues, images: imagesUrl });
    } catch (error) {
      if (error instanceof ZodError) {
        setFormErrors({
          location: error.formErrors.fieldErrors["location"]?.at(0) ?? "",
          description: error.formErrors.fieldErrors["description"]?.at(0) ?? "",
          images: error.formErrors.fieldErrors["images"]?.at(0) ?? "",
        });
      }
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <form
      onSubmit={(e) => void submitHandler(e)}
      className="flex h-full flex-col gap-5"
    >
      <label className="flex flex-col gap-1 capitalize">
        location:{" "}
        <input
          autoFocus
          type="text"
          className="rounded-md border border-black/10 bg-transparent p-2 text-sm font-normal outline-none duration-300 placeholder:capitalize placeholder:text-neutral-500 focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
          value={formValues.location}
          placeholder="enter location"
          onChange={changeHandler}
          name="location"
        />
        {formErrors.location && (
          <p className="text-center text-sm font-normal text-red-500">
            {formErrors.location}
          </p>
        )}
      </label>

      <label className="flex flex-col gap-1 capitalize">
        description:{" "}
        <textarea
          rows={3}
          className="duration300 rounded-md border border-black/10 bg-transparent p-2 text-sm font-normal outline-none placeholder:capitalize placeholder:text-neutral-500 focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
          value={formValues.description}
          placeholder="enter description"
          onChange={changeHandler}
          name="description"
        />
        {formErrors.description && (
          <p className="text-center text-sm font-normal text-red-500">
            {formErrors.description}
          </p>
        )}
      </label>

      <div className="space-y-1">
        <p className="flex flex-col capitalize">images:</p>

        {formValues.images.length > 0 && (
          <div className="flex snap-x gap-6 overflow-auto p-3">
            {formValues.images.map((image) => (
              <div key={image.id} className="relative snap-end">
                <Image
                  height={49}
                  width={49}
                  alt="image"
                  className="aspect-square min-w-[49px] rounded-md"
                  src={image.src}
                />
                <Button
                  name="remove-image"
                  title="remove image"
                  type="button"
                  className="absolute right-1 top-0 flex w-6 -translate-y-1/2 translate-x-1/2 rounded-full"
                  onClick={() => removeImage(image.id)}
                  size="square"
                >
                  <SvgIcon svgName="close" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div
          className="group relative hidden cursor-pointer grid-cols-[auto_1fr] gap-x-2 rounded-md border-2 border-dashed border-black/10 p-3 outline-none duration-300 hover:border-black/30 focus:border-black/30 dark:border-white/10 dark:hover:border-white/30 dark:focus:border-white/30 lg:grid"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="row-span-2 mx-3 aspect-square w-16 fill-black/10 duration-300 group-hover:fill-black/30 group-focus:fill-black/30 dark:fill-white/10 dark:group-hover:fill-white/30 dark:group-focus:fill-white/30"
          >
            <path d="M9 12c0-.552.448-1 1.001-1s.999.448.999 1-.446 1-.999 1-1.001-.448-1.001-1zm6.2 0l-1.7 2.6-1.3-1.6-3.2 4h10l-3.8-5zm5.8-7v-2h-21v15h2v-13h19zm3 2v14h-20v-14h20zm-2 2h-16v10h16v-10z" />
          </svg>
          <p className="self-center text-center text-xl font-semibold text-neutral-600 dark:text-neutral-400">
            Drag Images here or click to select files
          </p>
          <p className="text-center text-sm text-neutral-500">
            Attach up to 5 files as you like
          </p>
          <input
            ref={inputRef}
            type="file"
            tabIndex={-1}
            multiple
            value=""
            onChange={onFileDrop}
            accept="image/png, image/gif, image/jpeg"
            className="absolute inset-0 cursor-pointer opacity-0 file:hidden"
          />
        </div>

        <Button
          type="button"
          className="w-full lg:hidden"
          onClick={() => inputRef.current?.click()}
        >
          browse
        </Button>

        {formErrors.images && (
          <p className="text-center text-sm font-normal text-red-500">
            {formErrors.images}
          </p>
        )}
      </div>

      <Button
        disabled={isFormValid}
        className="mt-auto grid grid-cols-[1fr_auto_1fr] items-center"
      >
        {isLoading && <LoadingSpinner />}

        <span className="col-start-2">upload</span>
      </Button>
    </form>
  );
};

const NewPostButton = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const addToast = useToaster((state) => state.addToast);

  const openChangeHandler = () => {
    if (!session) {
      addToast("please sign in");
      return;
    }

    setIsOpen((prev) => !prev);
  };

  const closeMenuHandler = () => {
    setIsOpen(() => false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={openChangeHandler}>
      <DialogTrigger asChild>
        <Button
          size={"square"}
          title="New Post"
          variant={isMobile ? "action" : "default"}
          className={isMobile ? "col-start-2" : ""}
        >
          <SvgIcon svgName="plus" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
        </DialogHeader>

        <NewPostForm successHandler={closeMenuHandler} />
      </DialogContent>
    </Dialog>
  );
};

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "light" ? (
        <>
          <SvgIcon svgName="moon" />
          darkmode
        </>
      ) : (
        <>
          <SvgIcon svgName="sun" />
          lightmode
        </>
      )}
    </Button>
  );
};

const DeleteAccountButton = () => {
  const addToast = useToaster((state) => state.addToast);

  const removeMutation = api.user.remove.useMutation({
    onSuccess: async () => {
      await signOut({ redirect: false });
    },

    onError: () => {
      addToast("something went wrong");
    },
  });

  const clickHandler = () => {
    removeMutation.mutate();
  };

  return (
    <Button
      onClick={clickHandler}
      variant="ghost"
      className="fill-current text-destructive hover:bg-destructive/20"
    >
      <SvgIcon svgName="trash" />
      delete my account
    </Button>
  );
};

const SignOutButton = () => {
  const clickHandler = async () => {
    await signOut({ redirect: false });
  };

  return (
    <Button variant="ghost" onClick={() => void clickHandler()}>
      <SvgIcon svgName="logout" />
      signout
    </Button>
  );
};

const SignInWithGoogle = () => {
  const googleSignin = () => {
    void signIn("google");
  };

  return (
    <Button variant="ghost" onClick={googleSignin}>
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
    </Button>
  );
};

const SignInWithGithub = () => {
  const githubSignin = () => {
    void signIn("github");
  };

  return (
    <Button variant="ghost" onClick={githubSignin}>
      <svg
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="aspect-square w-4 fill-current"
      >
        <path d="M8.00564 0C3.57819 0 -0.000976562 3.66665 -0.000976562 8.2028C-0.000976562 11.8288 2.29232 14.8981 5.47373 15.9844C5.87148 16.0661 6.01718 15.8079 6.01718 15.5908C6.01718 15.4006 6.00407 14.7488 6.00407 14.0696C3.77682 14.5586 3.31302 13.0918 3.31302 13.0918C2.95508 12.1411 2.42474 11.8968 2.42474 11.8968C1.69576 11.3943 2.47784 11.3943 2.47784 11.3943C3.28647 11.4486 3.71078 12.2363 3.71078 12.2363C4.42648 13.4856 5.57976 13.1326 6.04373 12.9153C6.10994 12.3856 6.32218 12.0189 6.54753 11.8153C4.77114 11.6251 2.90215 10.919 2.90215 7.76813C2.90215 6.8718 3.22009 6.13847 3.72389 5.56814C3.6444 5.36448 3.36595 4.52231 3.80354 3.39515C3.80354 3.39515 4.47958 3.17782 6.00391 4.23715C6.65653 4.05759 7.32956 3.96625 8.00564 3.96548C8.68168 3.96548 9.37084 4.06065 10.0072 4.23715C11.5317 3.17782 12.2078 3.39515 12.2078 3.39515C12.6453 4.52231 12.3667 5.36448 12.2872 5.56814C12.8043 6.13847 13.1091 6.8718 13.1091 7.76813C13.1091 10.919 11.2402 11.6115 9.45049 11.8153C9.74221 12.0733 9.99394 12.5621 9.99394 13.3363C9.99394 14.4363 9.98083 15.3191 9.98083 15.5906C9.98083 15.8079 10.1267 16.0661 10.5243 15.9846C13.7057 14.8979 15.999 11.8288 15.999 8.2028C16.0121 3.66665 12.4198 0 8.00564 0Z" />
      </svg>
      sign in with Github
    </Button>
  );
};

const SearchButton = () => {
  const openSearchModal = useSearchModal((state) => state.open);

  const clickHandler = () => {
    openSearchModal();
  };

  return (
    <Button onClick={clickHandler} variant="ghost">
      <SvgIcon svgName="magnifier" />
      search
    </Button>
  );
};

const MenuContent = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav
      className="flex flex-col gap-1 fill-current pt-2 capitalize text-slate-100"
      onClick={(e) => e.stopPropagation()}
    >
      <Button asChild variant="ghost">
        <Link aria-current={router.asPath === "/"} href="/">
          <SvgIcon svgName="house" />
          home
        </Link>
      </Button>

      <SearchButton />

      <ThemeButton />

      {session && (
        <>
          <Button asChild variant="ghost">
            <Link
              aria-current={
                router.asPath === `/users/${session?.user?.id}?tab=posts`
              }
              href={`/users/${session?.user?.id ?? ""}?tab=posts`}
            >
              <SvgIcon svgName="user" />
              profile
            </Link>
          </Button>

          <Button asChild variant="ghost">
            <Link
              aria-current={
                router.asPath ===
                `/users/${session?.user?.id ?? ""}?tab=bookmarked`
              }
              href={`/users/${session?.user?.id ?? ""}?tab=bookmarked`}
            >
              <SvgIcon svgName="bookmark" />
              bookmarked
            </Link>
          </Button>

          <Button asChild variant="ghost">
            <Link
              aria-current={
                router.asPath === `/users/${session?.user?.id ?? ""}?tab=liked`
              }
              href={`/users/${session?.user?.id ?? ""}?tab=liked`}
            >
              <SvgIcon svgName="heart" />
              liked
            </Link>
          </Button>
        </>
      )}

      <hr className="my-2 border-neutral-500" />

      {session && (
        <>
          <SignOutButton />
          <DeleteAccountButton />
        </>
      )}

      {!session && (
        <>
          <SignInWithGithub />
          <SignInWithGoogle />
        </>
      )}
    </nav>
  );
};

const ListOfUsersSkeleton = () => {
  return (
    <>
      {[...Array<unknown>(10)].map((_, i) => (
        <div
          key={i}
          className="after:animate-comment-skeleton relative flex items-center gap-2 overflow-hidden rounded-md p-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:rotate-[-50deg] after:bg-black/10 after:blur-xl dark:after:bg-white/10"
        >
          <div className="aspect-square w-9 rounded-full bg-black/10 dark:bg-white/10" />
          <div className="h-2 w-24 rounded-full bg-black/10 dark:bg-white/10" />
        </div>
      ))}
    </>
  );
};

type ListOfUserProps = {
  users?: RouterOutputs["user"]["all"]["all"];
};

const ListOfUser = ({ users }: ListOfUserProps) => {
  const { data: session } = useSession();

  if (!users) {
    return <ListOfUsersSkeleton />;
  }

  if (users.length < 1) {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mx-auto w-32 fill-black/50 dark:fill-white/50"
        >
          <path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z" />
        </svg>
        <p className="text-center text-xl text-black/50 dark:text-white/50">
          no user
        </p>
      </>
    );
  }

  return (
    <>
      {users.map((user) => (
        <li key={user.id} className="flex items-center gap-2 p-2">
          <Avatar>
            <AvatarImage src={user.image ?? ""} alt="profile picture" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link
            href={`/users/${user.id}?tab=posts`}
            className="truncate capitalize hover:underline"
          >
            {user.name}
          </Link>
          {user.followedBy.find(
            (follower) => follower.followerId === session?.user.id
          ) && (
            <p className="ml-auto capitalize italic text-neutral-500">
              • following
            </p>
          )}
        </li>
      ))}
    </>
  );
};

const QuickSearchContent = () => {
  const [name, setName] = useState("");
  const allUsersInfiniteQuery = api.user.all.useInfiniteQuery(
    { name, limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    }
  );

  const scrollHandler = (e: UIEvent) => {
    const target = e.target as HTMLElement;
    const bottom =
      target.scrollHeight - target.clientHeight <= target.scrollTop + 100;

    if (
      bottom &&
      allUsersInfiniteQuery.hasNextPage &&
      !allUsersInfiniteQuery.isFetchingNextPage
    ) {
      void allUsersInfiniteQuery.fetchNextPage();
    }
  };

  return (
    <>
      <div className="flex gap-5 fill-neutral-500">
        <SvgIcon svgName="magnifier" />

        <input
          autoFocus
          placeholder="Enter a name"
          className="bg-transparent outline-none placeholder:text-neutral-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <kbd className="ml-auto mr-10 font-sans text-sm capitalize text-neutral-500 lg:mr-0">
          <abbr className="no-underline" title="Escape">
            esc
          </abbr>
        </kbd>
      </div>

      <hr className="my-5 border-black/20 dark:border-white/20" />

      <ul
        className="grow space-y-3 overflow-auto pr-5"
        onScroll={scrollHandler}
      >
        <ListOfUser
          users={allUsersInfiniteQuery.data?.pages
            .map((page) => page.all)
            .flatMap((z) => z)}
        />
        {allUsersInfiniteQuery.isFetchingNextPage && <ListOfUsersSkeleton />}
      </ul>
    </>
  );
};

const useSearchModal = create<UseMenu>((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}));

const QuickSearchButton = () => {
  const isOpen = useSearchModal((state) => state.isOpen);
  const close = useSearchModal((state) => state.close);
  const open = useSearchModal((state) => state.open);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => close();

    router.events.on("routeChangeStart", handleRouteChange);

    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  const onOpenChange = () => {
    if (isOpen) {
      return close();
    }

    open();
  };

  return (
    <>
      <Button onClick={open} className="flex w-post items-center gap-2">
        <SvgIcon svgName="magnifier" />
        quick search...
        <kbd className="ml-auto font-sans text-sm capitalize text-slate-400">
          <abbr className="no-underline" title="Control">
            ctrl
          </abbr>{" "}
          k
        </kbd>
      </Button>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <QuickSearchContent />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

type UseMenu = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(() => false);

    router.events.on("routeChangeStart", handleRouteChange);

    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events, setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="square" title="Open Menu">
          <SvgIcon svgName="menu" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <MenuContent />
      </DialogContent>
    </Dialog>
  );
};

const SignInButton = () => {
  return (
    <Button onClick={() => null} variant="action">
      signin
    </Button>
  );
};

const AvatarMenu = () => {
  const { data: session } = useSession();

  return (
    <Avatar>
      <AvatarImage
        src={session?.user.image ?? ""}
        role="button"
        title="Open Menu"
        onClick={() => null}
        alt="user profile picture"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

const grandHotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
});

const Title = () => {
  return (
    <Link href={"/"} className="w-max">
      <h1
        className={`${grandHotel.className} text-3xl capitalize dark:text-slate-300`}
      >
        instagram
      </h1>
    </Link>
  );
};

const DesktopHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 hidden p-5 after:absolute after:inset-0 after:-z-10 after:bg-white/50 after:backdrop-blur-md dark:after:bg-black/50 lg:block">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_350px_1fr] items-center">
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
    <div className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-[1fr_auto_1fr] justify-items-end rounded-t-3xl bg-white/50 p-5 backdrop-blur-md dark:bg-black/50 lg:hidden">
      <NewPostButton isMobile />
      <MenuButton />
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />

      {children}

      <Toaster />
      <Background />
    </>
  );
};

export default Layout;
