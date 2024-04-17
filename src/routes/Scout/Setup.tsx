import { NumberInput, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { MatchGUNEntry } from "../../GUNEntries";
import { gunClient } from "../../gunProvider";
import { useClientSpecificMatchData } from "../../stores/useClientSpecificMatchData";
import { useEventStore } from "../../stores/useEventStore";
import { usePositionStore } from "../../stores/usePositionStore";

export const SetupScout: FC = () => {
  const {
    currentMatch,
    setCurrentMatch,
    currentTargetTeam,
    setCurrentTargetTeam,
  } = useClientSpecificMatchData();
  const { currentEventKey } = useEventStore();
  const { currentPosition } = usePositionStore();
  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    if (!currentMatch) return;

    gunClient
      .get(currentEventKey)
      .get("matches")
      .once((eventData) => console.dir({ data: eventData }));

    gunClient
      .get(currentEventKey)
      .get("matches")
      .get(currentMatch.toString())
      .once((match) => {
        console.dir({ match });

        if (!match) {
          setErrorText("Current match not in database");
          return;
        }

        const entry = match as MatchGUNEntry;

        const targetTeam = entry[currentPosition];

        setCurrentTargetTeam(targetTeam);
      });
  }, [currentEventKey, currentMatch, setCurrentTargetTeam]);

  return (
    <>
      <Text c={"red"}>{errorText}</Text>
      <NumberInput
        value={currentMatch}
        onChange={(num) => {
          if (typeof num === "string") return;

          setCurrentMatch(num);
        }}
      />
      {JSON.stringify({
        currentTargetTeam,
        currentEventKey,
        currentPosition,
        currentMatch,
      })}
    </>
  );
};
