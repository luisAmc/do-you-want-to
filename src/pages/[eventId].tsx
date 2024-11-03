import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSideProps } from "next";
import { appRouter } from "~/trpc/root";
import superjson from "superjson";
import { db } from "~/utils/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db,
    },
    transformer: superjson,
  });

  const eventId = context.query.eventId! as string;
  await helpers.event.byId.prefetch({ id: eventId });

  //   const event = api.event.byId.useQuery({ id: context.query.id as string });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      eventId,
    },
  };
};

export { ViewEvent as default } from "~/components/ViewEvent";
