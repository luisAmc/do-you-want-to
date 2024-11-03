import { Form, useZodForm } from "../shared/Form";
import { Page } from "../shared/Page";
import { TextArea } from "../shared/TextArea";
import { Input } from "../shared/Input";
import { CrownIcon, MapPinIcon } from "lucide-react";
import { SubmitButton } from "../shared/SubmitButton";
import { formatDate } from "~/utils/transforms";
import { addHours } from "date-fns";
import { createEventSchema } from "~/utils/schemas";
import { useFormContext } from "react-hook-form";
import { api } from "~/utils/api";

export function CreateEvent() {
  const createEventMutation = api.event.create.useMutation({
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const form = useZodForm({
    schema: createEventSchema,
    defaultValues: {
      date: formatDate(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm") as any,
    },
  });

  return (
    <Page>
      <Form
        form={form}
        onSubmit={(input) => createEventMutation.mutateAsync(input)}
        className="gap-y-4"
      >
        <Image />

        <Input
          {...form.register("media")}
          placeholder="Link de la imagen / GIF"
        />

        <Details />

        <SubmitButton size="xl" className="rounded-none">
          Crear evento
        </SubmitButton>
      </Form>
    </Page>
  );
}

function Image() {
  const { setValue } = useFormContext();

  return (
    <div className="aspect-square w-full">
      <img
        alt="invite"
        fetchPriority="high"
        src="https://res.cloudinary.com/partiful/image/upload/f_jpg,fl_lossy,c_limit,fl_progressive,w_400,q_auto/posters/fall-invite.png"
        className="object-cover h-full"
      />
    </div>
  );
}

function Details() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-y-1">
      <TextArea
        variant="big"
        placeholder="*Evento sin nombre"
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
    </div>
  );
}
