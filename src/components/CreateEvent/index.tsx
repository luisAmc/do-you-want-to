import { z } from "zod";
import { Form, useZodForm } from "../shared/Form";
import { Page } from "../shared/Page";
import { TextArea } from "../shared/TextArea";
import { Input } from "../shared/Input";
import { CrownIcon, MapPinIcon } from "lucide-react";
import { SubmitButton } from "../shared/SubmitButton";
import { formatDate } from "~/utils/transforms";
import { addHours } from "date-fns";

export function CreateEvent() {
  return (
    <Page>
      <Image />
      <Details />
    </Page>
  );
}

function Image() {
  return (
    <div className="aspect-square w-full">
      <img
        alt="invite"
        fetchPriority="high"
        srcSet="https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_40,q_auto/posters/fall-invite.png 40w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_80,q_auto/posters/fall-invite.png 80w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_200,q_auto/posters/fall-invite.png 200w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_250,q_auto/posters/fall-invite.png 250w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_300,q_auto/posters/fall-invite.png 300w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_400,q_auto/posters/fall-invite.png 400w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_460,q_auto/posters/fall-invite.png 460w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_520,q_auto/posters/fall-invite.png 520w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_630,q_auto/posters/fall-invite.png 630w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_708,q_auto/posters/fall-invite.png 708w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_800,q_auto/posters/fall-invite.png 800w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_920,q_auto/posters/fall-invite.png 920w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_1062,q_auto/posters/fall-invite.png 1062w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_1200,q_auto/posters/fall-invite.png 1200w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_1300,q_auto/posters/fall-invite.png 1300w, https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_1440,q_auto/posters/fall-invite.png 1440w"
      />
    </div>
  );
}

const detailsSchema = z.object({
  title: z.string().trim().min(1),

  date: z.date(),

  hostedBy: z.string().trim().optional(),
  place: z.string().trim().optional(),
  description: z.string().trim().optional(),
});

function Details() {
  const form = useZodForm({
    schema: detailsSchema,
    defaultValues: {
      date: formatDate(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm") as any,
    },
  });

  return (
    <Form
      form={form}
      onSubmit={(input) => {
        console.log({ input });
      }}
      className="gap-y-1"
    >
      <TextArea
        variant="big"
        placeholder="Evento sin nombre"
        {...form.register("title")}
      />

      <Input
        type="datetime-local"
        placeholder="Seleccione la fecha"
        {...form.register("date")}
      />

      <Input placeholder="Organizado por..." {...form.register("hostedBy")}>
        <CrownIcon className="size-6 text-gray-400 mr-2" />
      </Input>

      <Input placeholder="Será en..." {...form.register("place")}>
        <MapPinIcon className="size-6 text-gray-400 mr-2" />
      </Input>

      <TextArea
        placeholder="Descripción del evento..."
        {...form.register("description")}
      />

      <SubmitButton size="xl" className="mt-4 rounded-none">
        Crear evento
      </SubmitButton>
    </Form>
  );
}
