import { RSVPOptions } from "@prisma/client";
import { ParticipateDrawer, useParticipateDrawer } from "./ParticipateModal";
import { OptionButton } from "./OptionButton";

export function RSVPButtons() {
  const participateModal = useParticipateDrawer();

  return (
    <>
      <div className="flex items-center justify-evenly">
        <OptionButton
          variant={RSVPOptions.GOING}
          onClick={participateModal.open}
        />

        <OptionButton
          variant={RSVPOptions.MAYBE}
          onClick={participateModal.open}
        />

        <OptionButton
          variant={RSVPOptions.CANT_GO}
          onClick={participateModal.open}
        />
      </div>

      <ParticipateDrawer {...participateModal.props} />
    </>
  );
}
