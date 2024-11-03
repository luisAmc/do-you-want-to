import { RSVPOptions } from "@prisma/client";
import { ParticipateModal } from "./ParticipateModal";
import { OptionButton } from "./OptionButton";
import { useState } from "react";
import { useModal } from "../shared/Modal";

export function RSVPButtons() {
  const participateModal = useModal();
  const [clickedOption, setClickedOption] = useState<RSVPOptions | null>(null);

  function onClick(option: RSVPOptions) {
    setClickedOption(option);
    participateModal.open();
  }

  return (
    <>
      <div className="flex items-center justify-evenly">
        <OptionButton variant={RSVPOptions.GOING} onClick={onClick} />

        <OptionButton variant={RSVPOptions.MAYBE} onClick={onClick} />

        <OptionButton variant={RSVPOptions.CANT_GO} onClick={onClick} />
      </div>

      <ParticipateModal option={clickedOption} {...participateModal.props} />
    </>
  );
}
