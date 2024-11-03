import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createEventSchema, participateSchema } from "~/utils/schemas";
import { RSVPOptions } from "@prisma/client";

export const eventRouter = createTRPCRouter({
  create: publicProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx: { db }, input }) => {
      const event = await db.event.create({
        data: {
          imgSrc: input.media,
          title: input.title,
          date: input.date,
          hostedBy: input.hostedBy,
          place: input.place,
          description: input.description,
        },
      });

      const creationToken = event.creationToken;

      return { eventId: event.id, creationToken };
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.string().trim().min(1),
      })
    )
    .query(async ({ ctx: { db }, input }) => {
      const event = await db.event.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          participations: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      const going = event?.participations.filter(
        (participation) => participation.rsvp === RSVPOptions.GOING
      );

      const maybe = event?.participations.filter(
        (participation) => participation.rsvp === RSVPOptions.MAYBE
      );

      const cantGo = event?.participations.filter(
        (participation) => participation.rsvp === RSVPOptions.CANT_GO
      );

      return { ...event, going, maybe, cantGo };
    }),

  participate: publicProcedure
    .input(participateSchema)
    .mutation(async ({ ctx: { db }, input }) => {
      const event = await db.event.findUniqueOrThrow({
        where: {
          id: input.eventId,
        },
        select: {
          id: true,
        },
      });

      const participation = await db.participation.create({
        data: {
          eventId: input.eventId,

          name: input.name,
          rsvp: input.rsvp,
          comment: input.comment,
        },
      });

      return { participationId: participation.id };
    }),
});
