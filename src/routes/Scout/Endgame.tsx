import { Button, Radio, Stack, Textarea } from "@mantine/core";
import { FC } from "react";
import { StepperInput } from "../../elements/StepperInput";
import { useGunValue } from "../../hooks/useGunValue";
import { MatchSchemaKey } from "../../matchDataSchema";
import { useGunChain } from "../../stores/useGunChain";
import { Link } from "react-router-dom";
import { useClientSpecificMatchData } from "../../stores/useClientSpecificMatchData";

export const EndgameScout: FC = () => {
  const chain = useGunChain();

  const [spotlight, setSpotlight] = useGunValue<number, any>(
    chain.get("spotlit" as MatchSchemaKey)
  );

  const [rating, setRating] = useGunValue<number, any>(
    chain.get("rating" as MatchSchemaKey)
  );

  const [comments, setComments] = useGunValue<string, any>(
    chain.get("comments" as MatchSchemaKey)
  );

  const { currentMatch, setCurrentMatch } = useClientSpecificMatchData();

  return (
    <>
      <StepperInput
        value={spotlight}
        onChange={(value) => {
          if (typeof value === "string") return;

          setSpotlight(value);
        }}
        label={"Spotlit by scouted team"}
      />
      <Radio.Group
        label={"Driver Ranking (within same alliance)"}
        value={(rating ?? 0).toString()}
        onChange={(newPosition) => setRating(Number.parseInt(newPosition) || 0)}
      >
        <Stack>
          <Radio value={"1"} label="1" />
          <Radio value={"2"} label="2" />
          <Radio value={"3"} label="3" />
        </Stack>
      </Radio.Group>
      <Textarea
        value={comments}
        onChange={(event) => setComments(event.currentTarget.value)}
      />

      <Link
        to={"/scout/setup"}
        style={{
          all: "inherit",
        }}
      >
        <Button
          onClick={() => {
            setCurrentMatch(currentMatch + 1);
          }}
        >
          Scout next match
        </Button>
      </Link>
    </>
  );
};
