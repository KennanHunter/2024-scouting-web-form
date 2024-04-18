import { Button, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { MatchGUNEntry } from "../../GUNEntries";
import { StepperInput } from "../../elements/StepperInput";
import { useClientSpecificMatchData } from "../../stores/useClientSpecificMatchData";
import { useGunChain } from "../../stores/useGunChain";
import { usePositionStore } from "../../stores/usePositionStore";
import { Link } from "react-router-dom";

export const SetupScout: FC = () => {
  const { currentPosition } = usePositionStore();
  const { currentMatch, setCurrentMatch, setCurrentTargetTeam } =
    useClientSpecificMatchData();

  const chain = useGunChain();
  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    if (!currentMatch) return;

    chain.once((match) => {
      if (!match) {
        setErrorText("Current match not in database");
        return;
      }

      const entry = match as MatchGUNEntry;

      const targetTeam = entry[currentPosition];

      setCurrentTargetTeam(targetTeam);
    });
  }, [chain, setCurrentTargetTeam]);

  return (
    <>
      <Text c={"red"}>{errorText}</Text>
      <StepperInput
        label={"Match Number"}
        value={currentMatch}
        onChange={(num) => {
          if (typeof num === "string") return;

          setCurrentMatch(num);
        }}
      />

      <Link
        to={"/scout/auto"}
        style={{
          all: "inherit",
        }}
      >
        <Button>Auto</Button>
      </Link>
    </>
  );
};
