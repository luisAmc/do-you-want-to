import { RSVPOptions } from "@prisma/client";
import { z } from "zod";

const DEFAULT_IMG_SRC =
  "https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_400,q_auto/posters/fall-invite.png";

const stringShape = z.string().trim();

export const createEventSchema = z.object({
  title: stringShape.min(1),

  media: stringShape.min(1).default(DEFAULT_IMG_SRC),

  date: z.coerce.date(),

  hostedBy: stringShape.optional(),
  place: stringShape.optional(),
  description: stringShape.optional(),
});

export const participateSchema = z.object({
  eventId: stringShape.min(1),

  name: stringShape.min(1),
  rsvp: z.nativeEnum(RSVPOptions),
  comment: stringShape.optional(),
});
