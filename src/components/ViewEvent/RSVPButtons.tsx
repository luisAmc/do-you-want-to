import { RSVPOptions } from "@prisma/client";
import { ParticipateDrawer } from "./ParticipateModal";
import { OptionButton } from "./OptionButton";
import { useDrawer } from "../shared/Drawer";
import { useState } from "react";

export function RSVPButtons() {
  const participateDrawer = useDrawer();
  const [clickedOption, setClickedOption] = useState<RSVPOptions | null>(null);

  function onClick(option: RSVPOptions) {
    setClickedOption(option);
    participateDrawer.open();
  }

  return (
    <>
      <div className="flex items-center justify-evenly">
        <OptionButton variant={RSVPOptions.GOING} onClick={onClick} />

        <OptionButton variant={RSVPOptions.MAYBE} onClick={onClick} />

        <OptionButton variant={RSVPOptions.CANT_GO} onClick={onClick} />
      </div>

      <ParticipateDrawer option={clickedOption} {...participateDrawer.props} />
    </>
  );
}
