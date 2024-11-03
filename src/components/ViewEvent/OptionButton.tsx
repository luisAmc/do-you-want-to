import { RSVPOptions } from "@prisma/client";

export const LABEL_AND_EMOJI_BY_OPTION: Record<
  RSVPOptions,
  { label: string; emoji: string }
> = {
  GOING: { label: "Ahí llego", emoji: "👍" },
  MAYBE: { label: "Mmm, talvéz", emoji: "🤔" },
  CANT_GO: { label: "No puedo", emoji: "😢" },
};

interface OptionButtonProps {
  variant: RSVPOptions;
  onClick: (clickedOption: RSVPOptions) => void;
}

export function OptionButton({ variant, onClick }: OptionButtonProps) {
  const { label, emoji } = LABEL_AND_EMOJI_BY_OPTION[variant];

  return (
    <div className="flex flex-col items-center gap-y-2">
      <button
        type="button"
        className="size-20 sm:size-28 bg-gradient-to-tr border hover:rotate-12 transition-all shadow hover:shadow-md border-palette-blueGreenDark from-palette-blueGreenLight via-palette-cream to-palette-blueGreenLight rounded-full"
        onClick={() => onClick(variant)}
      >
        <span className="text-4xl">{emoji}</span>
      </button>

      <span className="font-bold text-palette-blueGreenDark">{label}</span>
    </div>
  );
}
