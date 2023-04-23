import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SuperJSON from "superjson";
import { Avatar } from "~/components/Avatar";
import { Timeline } from "~/components/Timeline";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

type UserDetailsProps = {
  user: NonNullable<RouterOutputs["user"]["byId"]>;
};

const UserDetails = ({ user }: UserDetailsProps) => {
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

      <button className="ml-auto rounded-md border border-white/10 bg-brand-gradient bg-origin-border px-10 py-1 font-medium capitalize text-white opacity-75 duration-300 hover:opacity-100">
        follow
      </button>
    </div>
  );
};

const UserStats = () => {
  return (
    <div className="mt-2 flex justify-between capitalize">
      <p>
        <strong>5</strong> posts
      </p>
      <p>
        <strong>200</strong> followers
      </p>
      <p>
        <strong>12</strong> followings
      </p>
    </div>
  );
};

const Tabs = () => {
  const router = useRouter();
  const userId = router.query.id as string;

  return (
    <nav className="relative mt-7 flex  text-center capitalize text-neutral-600 dark:text-neutral-400">
      <Link
        aria-current={router.query.tab === "posts"}
        href={`/users/${userId}?tab=posts`}
        className="flex-1 py-1 duration-300 aria-[current=true]:text-slate-900 dark:aria-[current=true]:text-slate-100"
      >
        posts
      </Link>
      <Link
        aria-current={router.query.tab === "bookmarked"}
        href={`/users/${userId}?tab=bookmarked`}
        className="flex-1 py-1 duration-300 aria-[current=true]:text-slate-900 dark:aria-[current=true]:text-slate-100"
      >
        bookmarked
      </Link>
      <Link
        aria-current={router.query.tab === "liked"}
        href={`/users/${userId}?tab=liked`}
        className="flex-1 py-1 duration-300 aria-[current=true]:text-slate-900 dark:aria-[current=true]:text-slate-100"
      >
        liked
      </Link>

      <div
        className="absolute bottom-0 left-0 top-0 -z-10 w-[calc(100%/3)] rounded-md border border-black/10 bg-black/5 duration-300 dark:border-white/10 dark:bg-white/5"
        style={{
          translate: `${
            router.query.tab === "posts"
              ? 0
              : router.query.tab === "bookmarked"
              ? 100
              : router.query.tab === "liked"
              ? 200
              : 0
          }% 0`,
        }}
      />
    </nav>
  );
};

const UserPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const userQuery = api.user.byId.useQuery({ id: props.id });
  const userPostsInfiniteQuery = api.post.all.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      select: (data) => ({
        pages: data.pages
          .map((page) => ({
            posts: page.posts.filter((post) => post.userId === props.id),
            nextCursor: page.nextCursor,
          }))
          .filter((page) => page.posts.length > 0),
        pageParams: data.pageParams,
      }),
    }
  );

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

      <div className="sticky top-0 z-10 rounded-b-3xl bg-white/50 px-[calc(50vw-175px)] pb-5 pt-3 backdrop-blur-md dark:bg-black/50 lg:static lg:rounded-none">
        <UserDetails user={userQuery.data} />

        <UserStats />

        <Tabs />
      </div>

      <Timeline infiniteQuery={userPostsInfiniteQuery} />
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
  await helpers.post.all.prefetchInfinite({ limit: 5 });

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
