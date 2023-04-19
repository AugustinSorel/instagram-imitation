import { createServerSideHelpers } from "@trpc/react-query/server";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren, ChangeEvent, FormEvent, UIEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import superjson from "superjson";
import { v4 as uuidV4 } from "uuid";
import { Avatar } from "~/components/Avatar";
import { BottomSheet } from "~/components/BottomSheet";
import { SvgIcon } from "~/components/SvgIcon";
import { useToaster } from "~/components/Toaster";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api, type RouterOutputs } from "~/utils/api";
import { ZodError, z } from "zod";
import { LoadingSpinner } from "~/components/LoadingSpinner";

const SkeletonPost = () => {
  return (
    <div className="relative flex h-post w-post flex-col justify-between overflow-hidden rounded-3xl border border-black/20 bg-white/20 p-2 shadow-2xl backdrop-blur-md after:absolute after:bottom-0 after:left-0 after:top-0 after:w-32 after:rotate-[20deg] after:scale-150 after:animate-post-skeleton after:bg-black/10 after:blur-xl dark:border-white/10 dark:bg-black/20 dark:after:bg-white/10">
      <header className="grid grid-cols-[auto_1fr] gap-1 p-1">
        <div className="row-span-2 my-auto aspect-square w-7 rounded-full bg-black/10 dark:bg-white/10" />
        <div className="h-3 w-20 self-end rounded-full bg-black/10 dark:bg-white/10" />
        <div className="h-2 w-14 rounded-full bg-black/10 dark:bg-white/10" />
      </header>

      <div className="mb-3 flex items-center justify-center gap-3">
        {[...Array<unknown>(3)].map((_, i) => (
          <div
            key={i}
            className="aspect-square w-5 rounded-full bg-black/10 dark:bg-white/10"
          />
        ))}
      </div>
    </div>
  );
};

const ListOfPostSkeleton = () => {
  return (
    <>
      {[...Array<unknown>(5)].map((_, i) => (
        <SkeletonPost key={i} />
      ))}
    </>
  );
};

const SkeletonComment = () => {
  return (
    <li className="relative grid grid-cols-[auto_auto_auto_1fr] items-center gap-2 overflow-hidden rounded-md p-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:rotate-[-30deg] after:animate-comment-skeleton after:bg-black/10 after:blur-xl dark:after:bg-white/10">
      <div className="aspect-square w-9 rounded-full bg-black/10 dark:bg-white/10" />
      <div className="h-3 w-28 rounded-md bg-black/10 dark:bg-white/10" />
      <div className="col-span-full space-y-1">
        <div className="h-3 w-full rounded-md bg-black/10 dark:bg-white/10" />
        <div className="h-3 w-full rounded-md bg-black/10 dark:bg-white/10" />
        <div className="h-3 w-1/2 rounded-md bg-black/10 dark:bg-white/10" />
      </div>
    </li>
  );
};

const ListOfCommentSkeletons = () => {
  return (
    <>
      {[...Array<unknown>(10)].map((_, i) => (
        <SkeletonComment key={i} />
      ))}
    </>
  );
};

const LikeButton = ({ post }: PostProps) => {
  const { data: session } = useSession();
  const addToast = useToaster((state) => state.addToast);
  const hasLiked = post.likes.some(
    (like) => like.postId === post.id && like.userId === session?.user.id
  );

  const utils = api.useContext();

  const likeMutation = api.post.like.useMutation({
    onMutate: async () => {
      await utils.post.all.cancel();

      utils.post.all.setInfiniteData({ limit: 5 }, (data) => {
        if (!data || !session) {
          return {
            pages: [],
            pageParams: [],
          };
        }

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p) => {
              if (p.id === post.id) {
                return {
                  ...p,
                  likes: [
                    ...p.likes,
                    {
                      id: uuidV4(),
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      userId: session.user.id,
                      postId: post.id,
                    },
                  ],
                };
              }

              return p;
            }),
          })),
        };
      });
    },

    onSettled: () => {
      void utils.post.all.invalidate();
    },
  });

  const removeLikeMutation = api.post.removeLike.useMutation({
    onMutate: async () => {
      await utils.post.all.cancel();

      utils.post.all.setInfiniteData({ limit: 5 }, (data) => {
        if (!data) {
          return {
            pages: [],
            pageParams: [],
          };
        }

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p) => {
              return {
                ...p,
                likes: p.likes.filter(
                  (like) =>
                    like.postId !== post.id || like.userId !== session?.user.id
                ),
              };
            }),
          })),
        };
      });
    },

    onSettled: () => {
      void utils.post.all.invalidate();
    },
  });

  const clickHandler = () => {
    if (!session) {
      addToast("Please sign in");
      return;
    }
    if (hasLiked) {
      removeLikeMutation.mutate({ postId: post.id });
      return;
    }

    likeMutation.mutate({ postId: post.id });
  };

  return (
    <button
      aria-pressed={hasLiked}
      title="like"
      name="like"
      className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100 aria-[pressed=true]:fill-red-500 dark:border-white/20 dark:bg-black/50 dark:hover:bg-black/80 dark:hover:fill-slate-100 dark:focus-visible:bg-black/80 dark:focus-visible:fill-slate-300 dark:aria-[pressed=true]:fill-red-500"
      onClick={clickHandler}
    >
      <SvgIcon svgName={hasLiked ? "heartFilled" : "heart"} />
    </button>
  );
};

const BookmarkButton = ({ post }: PostProps) => {
  const { data: session } = useSession();
  const addToast = useToaster((state) => state.addToast);
  const hasBookmarked = post.bookmarks.some(
    (like) => like.postId === post.id && like.userId === session?.user.id
  );

  const utils = api.useContext();

  const bookmarkMutation = api.post.bookmark.useMutation({
    onMutate: async () => {
      await utils.post.all.cancel();

      utils.post.all.setInfiniteData({ limit: 5 }, (data) => {
        if (!data || !session) {
          return {
            pages: [],
            pageParams: [],
          };
        }

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p) => {
              if (p.id === post.id) {
                return {
                  ...p,
                  bookmarks: [
                    ...p.bookmarks,
                    {
                      id: uuidV4(),
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      userId: session.user.id,
                      postId: post.id,
                    },
                  ],
                };
              }

              return p;
            }),
          })),
        };
      });
    },

    onSettled: () => {
      void utils.post.all.invalidate();
    },
  });

  const removeBookmarkMutation = api.post.removeBookmark.useMutation({
    onMutate: async () => {
      await utils.post.all.cancel();

      utils.post.all.setInfiniteData({ limit: 5 }, (data) => {
        if (!data) {
          return {
            pages: [],
            pageParams: [],
          };
        }

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p) => {
              return {
                ...p,
                bookmarks: p.bookmarks.filter(
                  (bookmark) =>
                    bookmark.postId !== post.id ||
                    bookmark.userId !== session?.user.id
                ),
              };
            }),
          })),
        };
      });
    },

    onSettled: () => {
      void utils.post.all.invalidate();
    },
  });

  const clickHandler = () => {
    if (!session) {
      addToast("Please sign in");
      return;
    }
    if (hasBookmarked) {
      removeBookmarkMutation.mutate({ postId: post.id });
      return;
    }

    bookmarkMutation.mutate({ postId: post.id });
  };

  return (
    <button
      aria-pressed={hasBookmarked}
      title="bookmark this post"
      name="bookmark this post"
      className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100 aria-[pressed=true]:fill-slate-900 dark:border-white/20 dark:bg-black/50 dark:fill-slate-400 dark:hover:bg-black/80 dark:hover:fill-slate-100 dark:focus-visible:bg-black/80 dark:focus-visible:fill-slate-100"
      onClick={clickHandler}
    >
      <SvgIcon svgName={hasBookmarked ? "bookmarkFilled" : "bookmark"} />
    </button>
  );
};

const NewCommentForm = ({ post }: PostProps) => {
  const [comment, setComment] = useState("");
  const [errorComment, setErrorComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const utils = api.useContext();
  const { data: session } = useSession();

  const addCommentSchema = z.object({
    content: z
      .string({ required_error: "comment is required" })
      .min(3, "comment must be at least 3 characters")
      .max(2048, "comment must be at most 2048 characters"),
  });

  const addCommentMutation = api.post.addComment.useMutation({
    onSuccess: () => {
      setComment("");
    },

    onError: (error) => {
      setErrorComment(
        error.data?.zodError?.fieldErrors["comment"]?.at(0) ?? ""
      );
    },

    onSettled: () => {
      setIsLoading(() => false);
      void utils.post.comments.invalidate({ postId: post.id, limit: 5 });
    },

    onMutate: async () => {
      setErrorComment("");
      setIsLoading(() => true);

      await utils.post.comments.cancel({ limit: 10, postId: post.id });

      utils.post.comments.setInfiniteData(
        { limit: 10, postId: post.id },
        (data) => {
          if (!data || !session) {
            return {
              pages: [],
              pageParams: [],
            };
          }

          return {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              comments: [
                {
                  id: uuidV4(),
                  content: comment,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  userId: session.user.id ?? "",
                  postId: post.id,
                  user: {
                    id: session.user.id ?? "",
                    email: session.user.email ?? "",
                    emailVerified: new Date(),
                    image: session.user.image ?? "",
                    name: session.user.name ?? "",
                  },
                },
                ...page.comments,
              ],
            })),
          };
        }
      );
    },
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    try {
      addCommentSchema.parse({ content: comment });
      addCommentMutation.mutate({ content: comment, postId: post.id });
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorComment(error.formErrors.fieldErrors["comment"]?.at(0) ?? "");
      }
    }
  };

  return (
    <form
      className="grid grid-cols-[1fr_auto] items-center gap-x-5"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        autoFocus
        placeholder="Add your comment"
        className="grow bg-transparent outline-none"
        onChange={changeHandler}
        value={comment}
      />
      <button className="mt-auto grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 rounded-md border border-black/10 bg-black/5 fill-slate-600 px-2 py-2 text-sm capitalize duration-300 hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
        {isLoading && <LoadingSpinner />}
        <span className="col-start-2">upload</span>
      </button>
      {errorComment && (
        <p className="text-sm text-red-500 first-letter:capitalize">
          {errorComment}
        </p>
      )}
    </form>
  );
};

type CommentProps = {
  comment: RouterOutputs["post"]["comments"]["comments"][number];
};

const Comment = ({ comment }: CommentProps) => {
  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)} years`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} months`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} days`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hours`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutes`;
    }
    return `${Math.floor(seconds)} seconds`;
  };

  return (
    <li
      className="grid grid-cols-[auto_auto_auto_1fr] items-center gap-2 p-2"
      key={comment.id}
    >
      <Avatar
        src={comment.user.image ?? ""}
        alt={`${comment.user.image ?? ""} profile picture`}
      />
      <Link
        href={`/users/${comment.user.name ?? ""}`}
        className="text-lg hover:underline"
      >
        {comment.user.name}
      </Link>
      <p className="text-sm italic text-neutral-500">
        {timeSince(comment.createdAt)}
      </p>
      <p className="col-span-full">{comment.content}</p>
    </li>
  );
};

const NoCommentPanel = () => {
  return (
    <div className="flex grow flex-col items-center justify-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-32 fill-black/20 dark:fill-white/20"
      >
        <path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z" />
      </svg>
      <p className="text-center text-xl text-black/20 dark:text-white/20">
        no comments
      </p>
    </div>
  );
};

const ListOfComments = ({ post }: PostProps) => {
  const allCommentsInfiniteQuery = api.post.comments.useInfiniteQuery(
    { postId: post.id, limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      placeholderData: {
        pages: [{ comments: post.comments, nextCursor: {} }],
        pageParams: [],
      },
    }
  );

  const onScroll = (e: UIEvent) => {
    const target = e.target as HTMLElement;
    const bottom =
      target.scrollHeight - target.clientHeight <= target.scrollTop + 100;

    if (bottom && allCommentsInfiniteQuery.hasNextPage) {
      void allCommentsInfiniteQuery.fetchNextPage();
    }
  };

  if (allCommentsInfiniteQuery.status !== "success") {
    return (
      <ul className="grow space-y-5 overflow-auto">
        <ListOfCommentSkeletons />
      </ul>
    );
  }

  if ((allCommentsInfiniteQuery.data.pages[0]?.comments ?? []).length < 1) {
    return <NoCommentPanel />;
  }

  return (
    <ul className="grow space-y-3 overflow-auto" onScroll={(e) => onScroll(e)}>
      {allCommentsInfiniteQuery.data.pages.map((page) =>
        page.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}

      {allCommentsInfiniteQuery.isFetchingNextPage && (
        <ListOfCommentSkeletons />
      )}
    </ul>
  );
};

const CommentButton = ({ post }: PostProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const showComments = () => {
    setIsOpen(() => true);
  };

  const triggerCloseAnimation = () => {
    setIsClosing(() => true);
  };

  const animationEndHandler = () => {
    if (isClosing) {
      setIsClosing(() => false);
      setIsOpen(() => false);
    }
  };

  return (
    <>
      <button
        title="view comments"
        name="view comments"
        className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100 dark:border-white/20 dark:bg-black/50 dark:hover:bg-black/80 dark:hover:fill-slate-100 dark:focus-visible:bg-black/80 dark:focus-visible:fill-slate-100"
        onClick={showComments}
      >
        <SvgIcon svgName="speech" />
      </button>

      {isOpen && (
        <BottomSheet
          backdropProps={{
            isExpanded: !isClosing,
            animationEndHandler: animationEndHandler,
            clickHandler: triggerCloseAnimation,
          }}
        >
          <header className="flex items-center gap-5 p-2">
            <Avatar
              alt={`${post.user.name ?? ""} avatar`}
              src={post.user.image ?? ""}
            />
            <Link
              href={`/users/${post.user.name ?? ""}`}
              className="text-2xl capitalize hover:underline"
            >
              {post.user.name}
            </Link>
          </header>

          <hr className="my-5 border-black/20 dark:border-white/20" />

          <ListOfComments post={post} />

          <hr className="my-5 border-black/20 dark:border-white/20" />

          <NewCommentForm post={post} />
        </BottomSheet>
      )}
    </>
  );
};

type PostProps = {
  post: RouterOutputs["post"]["all"]["posts"][number];
};

const Post = ({ post }: PostProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const viewNextImage = () => {
    setImageIndex((prev) => (prev >= post.images.length - 1 ? 0 : prev + 1));
  };

  const viewPrevImage = () => {
    setImageIndex((prev) => (prev <= 0 ? post.images.length - 1 : prev - 1));
  };

  const gotToImage = (index: number) => {
    if (index < 0 || index > post.images.length - 1) {
      return;
    }

    setImageIndex(index);
  };

  return (
    <div className="group relative isolate flex h-post w-post flex-col justify-between overflow-hidden rounded-3xl border border-black/20 p-2 shadow-xl duration-300 hover:shadow-2xl dark:border-white/10">
      <header className="flex items-center justify-between">
        <div className="grid w-32 grid-cols-[auto_1fr] gap-x-1 rounded-full border border-black/10 bg-white/50 p-1 backdrop-blur-md dark:bg-black/50">
          <Avatar
            alt="avatar"
            width={28}
            height={28}
            src={post.user.image ?? ""}
            className="row-span-2 w-7"
          />
          <Link
            href={`/users/${post.userId}`}
            className="self-end truncate text-[0.7rem] font-medium capitalize leading-3 hover:underline"
          >
            {post.user.name}
          </Link>
          <p className="truncate text-[0.6rem] capitalize leading-3">
            {post.location}
          </p>
        </div>

        <div className="space-x-2 fill-neutral-600 dark:fill-neutral-400">
          <BookmarkButton post={post} />
          <CommentButton post={post} />
          <LikeButton post={post} />
        </div>
      </header>

      {post.images.length > 1 && (
        <nav className="absolute left-0 right-0 top-1/2 mx-2 flex -translate-y-1/2 justify-between">
          <button
            title="view previous image"
            name="view previous image"
            className="aspect-square rounded-full border border-black/20 bg-white/50 fill-neutral-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100 dark:border-white/20 dark:bg-black/50 dark:fill-neutral-400 dark:hover:bg-black/80 dark:hover:fill-slate-100 dark:focus-visible:bg-black/80 dark:focus-visible:fill-slate-100"
            onClick={viewPrevImage}
          >
            <SvgIcon svgName="leftArrow" />
          </button>
          <button
            title="view next image"
            name="view next image"
            className="aspect-square rounded-full border border-black/20 bg-white/50 fill-neutral-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100 dark:border-white/20 dark:bg-black/50 dark:fill-neutral-400 dark:hover:bg-black/80 dark:hover:fill-slate-100 dark:focus-visible:bg-black/80 dark:focus-visible:fill-slate-100"
            onClick={viewNextImage}
          >
            <SvgIcon svgName="rightArrow" />
          </button>
        </nav>
      )}

      <footer className="mx-auto items-center ">
        {post.images.length > 1 && (
          <nav className="col-start-2 flex items-center gap-3">
            {[...Array<unknown>(post.images.length)].map((_, i) => (
              <button
                key={i}
                aria-current={i === imageIndex}
                name={`view post ${i + 1}`}
                title={`view post ${i + 1}`}
                className="aspect-square w-5 rounded-full border border-black/20 bg-white/50 backdrop-blur-md duration-300 hover:bg-white/80 focus-visible:bg-white/80 aria-[current=true]:bg-white/80 dark:border-white/10 dark:bg-black/40 dark:hover:bg-black/80 dark:focus-visible:bg-black/80 dark:aria-[current=true]:bg-black/80"
                onClick={() => gotToImage(i)}
              />
            ))}
          </nav>
        )}
      </footer>

      <ul
        className="absolute inset-0 -z-10 flex w-max duration-300"
        style={{ translate: `${350 * imageIndex * -1}px 0` }}
      >
        {post.images.map((src, i) => (
          <li
            key={i}
            aria-current={i === imageIndex}
            className="h-post w-post duration-300 aria-[current=true]:group-hover:scale-105"
          >
            <Image
              alt="image"
              priority={i === 0}
              src={src}
              height={500}
              width={350}
              quality={100}
              className="h-post w-post object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const MainContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto flex flex-col items-center justify-center gap-5 py-5">
      {children}
    </main>
  );
};

const Home = () => {
  const postsInfiniteQuery = api.post.all.useInfiniteQuery(
    { limit: 5 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const onScroll = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      const bottom =
        target.scrollHeight - target.clientHeight <= target.scrollTop + 100;

      if (bottom && postsInfiniteQuery.hasNextPage) {
        void postsInfiniteQuery.fetchNextPage();
      }
    },
    [postsInfiniteQuery]
  );

  useEffect(() => {
    const nextDiv = document.getElementById("__next") as HTMLElement;
    nextDiv.addEventListener("scroll", onScroll);
    return () => {
      nextDiv.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  if (postsInfiniteQuery.status !== "success") {
    return (
      <MainContainer>
        <ListOfPostSkeleton />
      </MainContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        {postsInfiniteQuery.data.pages.map((page) =>
          page.posts.map((post) => <Post key={post.id} post={post} />)
        )}

        {postsInfiniteQuery.isFetchingNextPage && <ListOfPostSkeleton />}
      </MainContainer>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma: prisma, session: null },
    transformer: superjson,
  });

  await helpers.post.all.prefetchInfinite({ limit: 5 });

  return {
    props: { trpcState: helpers.dehydrate() },
    revalidate: 1,
  };
};
