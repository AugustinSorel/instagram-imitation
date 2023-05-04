import { useSession } from "next-auth/react";
import { Grand_Hotel } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect, Fragment } from "react";
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
import {
  Github,
  Globe,
  Home,
  LogOut,
  Menu,
  PaletteIcon,
  Trash,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  signInWithGithubHandler,
  signInWithGoogleHandler,
  signOutHandler,
  useRemoveUser,
} from "~/utils/auth";

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
  }, [close]);

  useEffect(() => {
    const handleRouteChange = () => close();

    router.events.on("routeChangeStart", handleRouteChange);

    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events, close]);

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

const AvatarMenu = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const { removeUserHandler } = useRemoveUser();
  const router = useRouter();

  return (
    <DropdownMenu>
      {session && (
        <DropdownMenuTrigger asChild>
          <Avatar role="button">
            <AvatarImage
              tabIndex={0}
              src={session?.user.image ?? ""}
              title="Open Menu"
              alt="user profile picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      )}

      {!session && (
        <DropdownMenuTrigger asChild>
          <div>
            <Button className="hidden lg:block" variant="action">
              sign in
            </Button>

            <Button size="square" className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => void router.push("/")}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
          {session && (
            <DropdownMenuItem
              onClick={() =>
                void router.push(`/users/${session.user.id}?tab=posts`)
              }
            >
              <User className="mr-2 h-4 w-4" />
              <span>My account</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <PaletteIcon className="mr-2 h-4 w-4" />
              <span>theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {session ? (
          <DropdownMenuGroup>
            <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => void signOutHandler()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>sign out</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-destructive/20"
              onClick={removeUserHandler}
            >
              <Trash className="mr-2 h-4 w-4 stroke-destructive" />
              <span className="text-destructive">Delete account</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sign in</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => void signInWithGithubHandler()}>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => void signInWithGoogleHandler()}>
              <Globe className="mr-2 h-4 w-4" />
              <span>Google</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
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
  return (
    <header className="sticky top-0 z-10 hidden p-5 after:absolute after:inset-0 after:-z-10 after:bg-white/50 after:backdrop-blur-md dark:after:bg-black/50 lg:block">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_350px_1fr] items-center">
        <Title />

        <QuickSearchButton />

        <div className="ml-auto flex items-center gap-2">
          <NewPostButton />
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
};

const MobileHeader = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-[1fr_auto_1fr] justify-items-end rounded-t-3xl bg-white/50 p-5 backdrop-blur-md dark:bg-black/50 lg:hidden">
      <NewPostButton isMobile />
      <AvatarMenu />
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
