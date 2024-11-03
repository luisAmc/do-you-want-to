import { RSVPOptions } from "@prisma/client";
import { Drawer } from "../shared/Drawer";
import { Form, useZodForm } from "../shared/Form";
import { participateSchema } from "~/utils/schemas";
import { Input } from "../shared/Input";
import { TextArea } from "../shared/TextArea";
import { SubmitButton } from "../shared/SubmitButton";
import { useRouter } from "next/router";
import { LABEL_AND_EMOJI_BY_OPTION } from "./OptionButton";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "~/utils/cn";
import { api } from "~/utils/api";
import { useEffect } from "react";

interface ParticipateDrawerProps {
  option: RSVPOptions | null;
  open: boolean;
  onClose: () => void;
}

export function ParticipateDrawer({
  option,
  open,
  onClose,
}: ParticipateDrawerProps) {
  const router = useRouter();

  const form = useZodForm({
    schema: participateSchema,
    defaultValues: {
      eventId: router.query.eventId as string,
      rsvp: option ?? RSVPOptions.MAYBE,
    },
  });

  useEffect(() => {
    if (!option) {
      return;
    }

    form.setValue("rsvp", option);
  }, [option]);

  const queryClient = api.useUtils();

  const participateMutation = api.event.participate.useMutation({
    onSuccess: () => {
      const key = "do-you-want-to-participations";

      const participations: Array<string> = JSON.parse(
        localStorage.getItem(key) ?? "[]"
      );

      participations.push(router.query.eventId as string);

      localStorage.setItem(key, JSON.stringify(participations));

      queryClient.event.byId.invalidate();

      form.reset();
      onClose();
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  function handleOptionClick(clickedOption: RSVPOptions) {
    form.setValue("rsvp", clickedOption);
  }

  return (
    <Drawer title="Mi participación será..." open={open} onClose={onClose}>
      <Form
        form={form}
        className="gap-y-2"
        onSubmit={(input) => participateMutation.mutateAsync(input)}
      >
        <div className="flex items-center justify-evenly mb-2">
          <Option variant={RSVPOptions.GOING} onClick={handleOptionClick} />

          <Option variant={RSVPOptions.MAYBE} onClick={handleOptionClick} />

          <Option variant={RSVPOptions.CANT_GO} onClick={handleOptionClick} />
        </div>

        <Input {...form.register("name")} placeholder="*Nombre o apodo..." />

        <TextArea
          {...form.register("comment")}
          placeholder="Escribe un comentario (opcional)..."
          className="font-normal"
        />

        <SubmitButton>¡Enviar!</SubmitButton>
      </Form>
    </Drawer>
  );
}

function Option({
  variant,
  onClick,
}: {
  variant: RSVPOptions;
  onClick: (clickedOption: RSVPOptions) => void;
}) {
  const form = useFormContext();
  const selectedOption = useWatch({
    control: form.control,
    name: "rsvp",
  }) as RSVPOptions;

  const isSelected = selectedOption === variant;

  const { label, emoji } = LABEL_AND_EMOJI_BY_OPTION[variant];

  return (
    <div className="flex flex-col items-center gap-y-2">
      <button
        type="button"
        className={cn(
          "size-20 sm:size-28 bg-gradient-to-tr border hover:rotate-12 transition-all shadow hover:shadow-md rounded-full border-palette-blueGreenDark",
          isSelected
            ? " from-palette-blueGreenDark via-palette-blueGreenLight to-palette-blueGreenDark"
            : "from-palette-blueGreenLight via-palette-cream to-palette-blueGreenLight"
          // : "from-palette-ivory via-palette-cream to-palette-blond"
        )}
        onClick={() => onClick(variant)}
      >
        <span className="text-4xl">{emoji}</span>
      </button>

      <span className="font-bold text-palette-blueGreenDark">{label}</span>
    </div>
  );
}
