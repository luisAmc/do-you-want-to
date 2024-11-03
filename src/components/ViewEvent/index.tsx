import { api, RouterOutputs } from "~/utils/api";
import { CrownIcon, MapPinIcon } from "lucide-react";
import { formatDate } from "~/utils/transforms";
import { InferGetServerSidePropsType } from "next";
import { Page } from "../shared/Page";
import { RSVPButtons } from "./RSVPButtons";
import { type getServerSideProps as ViewEventServerSideProps } from "~/pages/[eventId]";
import { type ReactNode, useEffect, useState } from "react";

export function ViewEvent(
  props: InferGetServerSidePropsType<typeof ViewEventServerSideProps>
) {
  const { eventId } = props;

  const [hasParticipated, setHasParticipated] = useState(false);
  const { data: event, isLoading } = api.event.byId.useQuery({ id: eventId });

  useEffect(() => {
    if (!event) {
      return;
    }

    const key = "do-you-want-to-participations";

    const participations: Array<string> = JSON.parse(
      localStorage.getItem(key) ?? "[]"
    );

    const hasParticipated = participations.includes(event.id);
    setHasParticipated(hasParticipated);
  }, [event]);

  return (
    <Page>
      {isLoading && <div>Cargando...</div>}

      {event && (
        <>
          <Card>
            <div className="flex justify-center">
              <img
                alt="event image"
                src={event.imgSrc}
                className="w-full max-w-[400px] rounded-md"
              />
            </div>

            <h1 className="text-6xl font-semibold text-gray-700 text-pretty">
              {event.title}
            </h1>

            <DateAndTime date={event.date} />

            <HostedBy hostedBy={event.hostedBy} />

            <Place place={event.place} />
            
            <Description description={event.description} />

            {!hasParticipated && (
              <>
                <div className="py-2 border-b-2  border-palette-blueGreenLight"></div>
                <RSVPButtons />
              </>
            )}
          </Card>

          {hasParticipated && (
            <Card>
              <div>
                <h2 className="flex items-center justify-between border-b-2 px-2 text-lg space-x-2 font-bold border-palette-blueGreenDark pb-2 mb-2">
                  <span className="space-x-2">
                    <span>Ahí llego</span>
                    <span>👍</span>
                  </span>

                  <span>({event.going.length})</span>
                </h2>

                <div className="space-y-1">
                  {event.going.map((going) => (
                    <Participation key={going.id} participation={going} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="flex items-center justify-between border-b-2 px-2 text-lg space-x-2 font-bold border-palette-blueGreenDark pb-2 mb-2">
                  <span className="space-x-2">
                    <span>Mmm, talvéz</span>
                    <span>🤔</span>
                  </span>

                  <span>({event.maybe.length})</span>
                </h2>

                <div className="space-y-1">
                  {event.maybe.map((maybe) => (
                    <Participation key={maybe.id} participation={maybe} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="flex items-center justify-between border-b-2 px-2 text-lg space-x-2 font-bold border-palette-blueGreenDark pb-2 mb-2">
                  <span className="space-x-2">
                    <span>No puedo</span>
                    <span>😢</span>
                  </span>

                  <span>({event.cantGo.length})</span>
                </h2>

                <div className="space-y-1">
                  {event.cantGo.map((cantGo) => (
                    <Participation key={cantGo.id} participation={cantGo} />
                  ))}
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </Page>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 bg-gradient-to-tr from-palette-cream to-palette-blueGreenLight p-4 rounded-xl shadow-sm ring-2 ring-offset-palette-blueGreenDark">
      {children}
    </div>
  );
}

function DateAndTime({ date }: { date: Date | null }) {
  if (!date) {
    return null;
  }

  return (
    <div>
      <div className="text-4xl text-gray-700">
        {date ? (
          <span className="capitalize">{formatDate(date, "EEEE, d MMM")}</span>
        ) : (
          <span>TBD</span>
        )}
      </div>

      {date && (
        <div className="text-xl text-gray-600">
          {formatDate(date, "h:mm aaa")}
        </div>
      )}
    </div>
  );
}

function HostedBy({ hostedBy }: { hostedBy: string | null }) {
  if (!hostedBy) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-1">
        <CrownIcon className="size-4" />
        <span>Organizado por</span>
      </div>

      <div className="ml-8 p-2 bg-black/5 rounded-md font-semibold">
        {hostedBy}
      </div>
    </div>
  );
}

function Place({ place }: { place: string | null }) {
  if (!place) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-1">
        <MapPinIcon className="size-4" />
        <span>Ubicación</span>
      </div>

      <div className="ml-8 p-2 bg-black/5 rounded-md font-semibold">
        {place}
      </div>
    </div>
  );
}

function Description({ description }: { description: string | null }) {
  if (!description) {
    return null;
  }

  return (
    <div className="p-2 rounded-md font-medium text-pretty">{description}</div>
  );
}

function Participation({
  participation,
}: {
  participation: RouterOutputs["event"]["byId"]["participations"][number];
}) {
  return (
    <div className="p-2 bg-palette-blueGreenDark/20 rounded-md">
      <div className="flex items-center justify-between">
        <div className="font-medium">{participation.name}</div>

        <div className="text-gray-500 text-xs">
          {formatDate(participation.createdAt, "d MMM, h:mm aaa")}
        </div>
      </div>

      {participation.comment && (
        <div className="whitespace-break-spaces text-sm text-pretty p-2 rounded-md bg-palette-blueGreenDark/40 mt-1">
          {participation.comment}
        </div>
      )}
    </div>
  );
}
