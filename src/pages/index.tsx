import { createServerSideHelpers } from "@trpc/react-query/server";
import Head from "next/head";
import type { PropsWithChildren } from "react";
import superjson from "superjson";
import { Timeline, TimelineContext } from "~/components/Timeline";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

export const TimelineProvider = ({ children }: PropsWithChildren) => {
  return (
    <TimelineContext.Provider value={{ limit: 5 }}>
      {children}
    </TimelineContext.Provider>
  );
};

const Home = () => {
  return (
    <>
      <Head>
        <title>Instagram imitation</title>
        <meta
          name="description"
          content="this is a very simple instagram imitation app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TimelineProvider>
        <Timeline />
      </TimelineProvider>
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
