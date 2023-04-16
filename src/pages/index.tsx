import { createServerSideHelpers } from "@trpc/react-query/server";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import superjson from "superjson";
import { v4 as uuidV4 } from "uuid";
import { Avatar } from "~/components/Avatar";
import { SvgIcon } from "~/components/SvgIcon";
import { useToaster } from "~/components/Toaster";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api, type RouterOutputs } from "~/utils/api";

const SkeletonPost = () => {
  return (
    <div className="relative flex h-post w-post flex-col justify-between overflow-hidden rounded-3xl border border-black/20 bg-white/20 p-2 shadow-2xl backdrop-blur-md after:absolute after:bottom-0 after:left-0 after:top-0 after:w-32 after:rotate-[20deg] after:scale-150 after:animate-post-skeleton after:bg-black/10 after:blur-xl">
      <header className="grid grid-cols-[auto_1fr] gap-1 p-1">
        <div className="row-span-2 my-auto aspect-square w-7 rounded-full bg-black/10" />
        <div className="h-3 w-20 self-end rounded-full bg-black/10" />
        <div className="h-2 w-14 rounded-full bg-black/10" />
      </header>

      <div className="mb-3 flex items-center justify-center gap-3">
        {[...Array<unknown>(3)].map((_, i) => (
          <div key={i} className="aspect-square w-5 rounded-full bg-black/10" />
        ))}
      </div>
    </div>
  );
};

const ListOfSkeletons = () => {
  return (
    <>
      {[...Array<unknown>(5)].map((_, i) => (
        <SkeletonPost key={i} />
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
      className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100 aria-[pressed=true]:fill-red-500"
      onClick={clickHandler}
    >
      <SvgIcon svgName={hasLiked ? "heartFilled" : "heart"} />
    </button>
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
    <div className="group relative isolate flex h-post w-post flex-col justify-between overflow-hidden rounded-3xl border border-black/20 p-2 shadow-xl duration-300 hover:shadow-2xl">
      <header className="flex items-center justify-between">
        <div className="grid w-32 grid-cols-[auto_1fr] gap-x-1 rounded-full border border-black/10 bg-white/50 p-1 backdrop-blur-md">
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

        <div className="space-x-2 fill-slate-600">
          <button
            title="bookmark this post"
            name="bookmark this post"
            className="aspect-square rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <SvgIcon svgName="bookmark" />
          </button>
          <button
            title="view comments"
            name="view comments"
            className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <SvgIcon svgName="speech" />
          </button>
          <LikeButton post={post} />
        </div>
      </header>

      {post.images.length > 1 && (
        <nav className="absolute left-0 right-0 top-1/2 mx-2 flex -translate-y-1/2 justify-between">
          <button
            title="view previous image"
            name="view previous image"
            className="aspect-square rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
            onClick={viewPrevImage}
          >
            <SvgIcon svgName="leftArrow" />
          </button>
          <button
            title="view next image"
            name="view next image"
            className="aspect-square rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
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
                className="aspect-square w-5 rounded-full border border-black/20 bg-white/50 backdrop-blur-md duration-300 hover:bg-white/80 focus-visible:bg-white/80 aria-[current=true]:bg-white/80"
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
        <ListOfSkeletons />
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

        {postsInfiniteQuery.isFetchingNextPage && <ListOfSkeletons />}
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
