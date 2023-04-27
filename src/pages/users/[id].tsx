import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import SuperJSON from "superjson";
import { Avatar } from "~/components/Avatar";
import { Timeline, TimelineContext } from "~/components/Timeline";
import { useToaster } from "~/components/Toaster";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

const FollowButton = ({ user }: UserProps) => {
  const { data: session } = useSession();
  const addToast = useToaster((state) => state.addToast);
  const utils = api.useContext();

  const isFollowing = user.followedBy.find(
    (follower) => follower.followerId === session?.user.id
  );

  const followMutation = api.user.follow.useMutation({
    onMutate: async () => {
      await utils.user.byId.cancel({ id: user.id });

      utils.user.byId.setData({ id: user.id }, (prev) => {
        if (!prev || !session) {
          return;
        }

        return {
          ...prev,
          followedBy: [
            ...prev.followedBy,
            {
              followerId: session?.user.id,
              followingId: user.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        };
      });
    },

    onSettled: () => {
      void utils.user.byId.invalidate({ id: user.id });
    },
  });

  const unfollowMutation = api.user.unfollow.useMutation({
    onMutate: async () => {
      await utils.user.byId.cancel({ id: user.id });

      utils.user.byId.setData({ id: user.id }, (prev) => {
        if (!prev || !session) {
          return;
        }

        return {
          ...prev,
          followedBy: prev.followedBy.filter(
            (follower) =>
              follower.followingId === session.user.id &&
              follower.followerId === user.id
          ),
        };
      });
    },

    onSettled: () => {
      void utils.user.byId.invalidate({ id: user.id });
    },
  });

  const clickHandler = () => {
    if (!session) {
      addToast("Please sign in");
      return;
    }

    if (isFollowing) {
      unfollowMutation.mutate({ id: user.id });
      return;
    }

    followMutation.mutate({ id: user.id });
  };

  if (session?.user.id === user.id) {
    return null;
  }

  return (
    <button
      onClick={clickHandler}
      className="ml-auto rounded-md border border-white/10 bg-brand-gradient bg-origin-border px-10 py-1 font-medium capitalize text-white opacity-75 duration-300 hover:opacity-100"
    >
      {isFollowing ? "unfollow" : "follow"}
    </button>
  );
};

type UserProps = {
  user: NonNullable<RouterOutputs["user"]["byId"]>;
};

const UserDetails = ({ user }: UserProps) => {
  return (
    <div className="flex items-center">
      <Avatar
        src={user.image ?? ""}
        height={56}
        width={56}
        priority
        alt={`${user.name ?? ""}'s profile picture`}
      />

      <h2 className="ml-2 truncate font-medium capitalize">{user.name}</h2>

      <FollowButton user={user} />
    </div>
  );
};

const Tabs = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  const { data: session } = useSession();
  return (
    <nav className="relative mt-7 flex text-center capitalize text-neutral-600 dark:text-neutral-400">
      <Link
        aria-current={router.query.tab === "posts"}
        href={`/users/${userId}?tab=posts`}
        className="flex-1 rounded-md border-black/10 py-1 transition-colors duration-300 aria-[current=true]:border aria-[current=true]:bg-black/5 aria-[current=true]:text-slate-900 dark:border-white/10 aria-[current=true]:dark:bg-white/5 dark:aria-[current=true]:text-slate-100"
      >
        posts
      </Link>
      {session?.user.id === userId && (
        <Link
          aria-current={router.query.tab === "bookmarked"}
          href={`/users/${userId}?tab=bookmarked`}
          className="flex-1 rounded-md border-black/10 py-1 transition-colors duration-300 aria-[current=true]:border aria-[current=true]:bg-black/5 aria-[current=true]:text-slate-900 dark:border-white/10 aria-[current=true]:dark:bg-white/5 dark:aria-[current=true]:text-slate-100"
        >
          bookmarked
        </Link>
      )}
      <Link
        aria-current={router.query.tab === "liked"}
        href={`/users/${userId}?tab=liked`}
        className="flex-1 rounded-md border-black/10 py-1 transition-colors duration-300 aria-[current=true]:border aria-[current=true]:bg-black/5 aria-[current=true]:text-slate-900 dark:border-white/10 aria-[current=true]:dark:bg-white/5 dark:aria-[current=true]:text-slate-100"
      >
        liked
      </Link>
    </nav>
  );
};

const UserStats = ({ user }: UserProps) => {
  return (
    <div className="mt-2 flex justify-between capitalize">
      <p>
        <strong>{user._count.posts}</strong> posts
      </p>
      <p>
        <strong>{user.followedBy.length}</strong> followers
      </p>
      <p>
        <strong>{user.following.length}</strong> followings
      </p>
    </div>
  );
};

const TimelineProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const userId = router.query.id as string;
  const { tab } = router.query;

  return (
    <TimelineContext.Provider
      value={{
        limit: 5,
        where: (() => {
          if (tab === "liked") {
            return {
              likes: {
                some: {
                  userId: userId,
                },
              },
            };
          }

          if (tab === "bookmarked") {
            return {
              bookmarks: {
                some: {
                  userId: userId,
                },
              },
            };
          }

          return {
            userId: userId,
          };
        })(),
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};
const UserPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const userQuery = api.user.byId.useQuery({ id: props.id });

  if (userQuery.status !== "success" || !userQuery.data) {
    return <>Loading...</>;
  }

  return (
    <>
      <Head>
        <title>Instagram imitation | {userQuery.data?.name} </title>
        <meta
          name="description"
          content={`this is ${
            userQuery.data.name ?? ""
          }'s page from the instagram imitation`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="sticky top-0 z-10 rounded-b-3xl bg-white/50 px-[calc(50vw-175px)] pb-5 pt-5 backdrop-blur-md dark:bg-black/50 lg:static lg:rounded-none lg:pt-0">
        <UserDetails user={userQuery.data} />

        <UserStats user={userQuery.data} />

        <Tabs />
      </div>

      <TimelineProvider>
        <Timeline />
      </TimelineProvider>
    </>
  );
};

export default UserPage;

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma: prisma, session: null },
    transformer: SuperJSON,
  });

  const id = context.params?.id as string;

  await helpers.user.byId.prefetch({ id });
  await helpers.post.all.prefetchInfinite({
    limit: 5,
    where: { userId: id },
  });
  await helpers.post.all.prefetchInfinite({
    limit: 5,
    where: {
      likes: {
        some: {
          userId: id,
        },
      },
    },
  });
  await helpers.post.all.prefetchInfinite({
    limit: 5,
    where: {
      bookmarks: {
        some: { userId: id },
      },
    },
  });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.user.findMany();

  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id,
      },
    })),
    fallback: "blocking",
  };
};
