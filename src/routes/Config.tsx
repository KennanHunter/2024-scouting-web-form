import { Button, Center, Paper, Select, Stack, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { z } from "zod";
import { MatchGUNEntry } from "../GUNEntries";
import { gunClient } from "../gunProvider";
import { useEventStore } from "../stores/useEventStore";
import { Position, usePositionStore } from "../stores/usePositionStore";

const MatchesSchema = () =>
  z.object({
    matches: z
      .object({
        matchKey: z.string(),
        matchNumber: z.number(),
        matchEntries: z
          .object({
            alliance: z.literal("red").or(z.literal("blue")),
            teamNumber: z.number(),
          })
          .array(),
      })
      .array(),
  });

type ImportTBAParams = {
  eventKey: string;
  setFetchError: React.Dispatch<React.SetStateAction<string>>;
};

const importSchedule = async ({ setFetchError, eventKey }: ImportTBAParams) => {
  const response = await fetch(`https://api.scout.kennan.tech/graphql/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        getEvent(key: "2024incmp") {
          matches {
            matchKey
            matchNumber
            matchEntries {       
              alliance
              teamNumber
            }
          }
        }
      }`,
    }),
  });

  const responseJson = await response
    .json()
    .then((data) => data.data)
    .then((data) => z.object({ getEvent: z.unknown() }).parse(data))
    .then((data) => data.getEvent);

  const safelyParsedJson = MatchesSchema().safeParse(responseJson);

  console.dir(safelyParsedJson);

  if (!safelyParsedJson.success) {
    setFetchError("Event Data Response Corrupt, Please Ask Kennan");
    return;
  }

  const qualificationMatches = safelyParsedJson.data.matches.filter((match) =>
    match.matchKey.includes("qm")
  );

  console.dir({ safelyParsedJson, qualificationMatches });

  gunClient.get("schedule").put({ [eventKey]: {} });

  const event = gunClient.get(eventKey);

  const matches = event.get("matches");

  qualificationMatches
    .map((match) => {
      const red = match.matchEntries.filter((team) => team.alliance === "red");
      const blue = match.matchEntries.filter(
        (team) => team.alliance === "blue"
      );

      return {
        matchLevel: "Qualifications",
        matchNumber: match.matchNumber,

        "Red 1": red[0].teamNumber,
        "Red 2": red[1].teamNumber,
        "Red 3": red[2].teamNumber,

        "Blue 1": blue[0].teamNumber,
        "Blue 2": blue[1].teamNumber,
        "Blue 3": blue[2].teamNumber,
      } as MatchGUNEntry;
    })
    .forEach((match) => {
      console.dir(match);

      matches.get(match.matchNumber.toString()).put(match);
    });

  setFetchError("");
};

export const Config: FC = () => {
  const { currentPosition, setCurrentPosition } = usePositionStore();
  const [fetchError, setFetchError] = useState<string>("");
  const { currentEventKey, setCurrentEventKey } = useEventStore();

  return (
    <Center>
      <Paper p={"lg"} m={"sm"}>
        <Stack>
          <Select
            value={currentPosition}
            data={
              ["Red", "Blue"].flatMap((color) => [
                `${color} 1`,
                `${color} 2`,
                `${color} 3`,
              ]) as Position[]
            }
            onChange={(val) => setCurrentPosition(val as Position)}
          />

          <TextInput
            label={"Event Key"}
            value={currentEventKey}
            onChange={(e) => setCurrentEventKey(e.target.value)}
            error={fetchError || undefined}
          />

          <Button
            fullWidth
            onClick={() => {
              importSchedule({
                eventKey: currentEventKey,
                setFetchError,
              }).then(() => {
                console.log("Schedule import");
              });
            }}
          >
            Import
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
};
