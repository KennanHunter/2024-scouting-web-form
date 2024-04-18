import {
  Button,
  Checkbox,
  Flex,
  Group,
  Radio,
  Stack,
  Tabs,
} from "@mantine/core";
import { FC } from "react";
import { useGunValue } from "../../hooks/useGunValue";
import { MatchSchemaKey } from "../../matchDataSchema";
import { useGunChain } from "../../stores/useGunChain";
import { usePositionStore } from "../../stores/usePositionStore";
import { StepperInput } from "../../elements/StepperInput";
import { Link } from "react-router-dom";

export const AutoScout: FC = () => {
  const chain = useGunChain();

  const [startingPosition, setStartingPosition] = useGunValue<
    "A" | "B" | "C" | "D",
    any
  >(chain.get("startingPosition" as MatchSchemaKey));

  const [autoNote1, setAutoNote1] = useGunValue<boolean, any>(
    chain.get("autonote1" as MatchSchemaKey)
  );
  const [autoNote2, setAutoNote2] = useGunValue<boolean, any>(
    chain.get("autonote2" as MatchSchemaKey)
  );
  const [autoNote3, setAutoNote3] = useGunValue<boolean, any>(
    chain.get("autonote3" as MatchSchemaKey)
  );
  const [autoNote4, setAutoNote4] = useGunValue<boolean, any>(
    chain.get("autonote4" as MatchSchemaKey)
  );
  const [autoNote5, setAutoNote5] = useGunValue<boolean, any>(
    chain.get("autonote5" as MatchSchemaKey)
  );
  const [autoNote6, setAutoNote6] = useGunValue<boolean, any>(
    chain.get("autonote6" as MatchSchemaKey)
  );
  const [autoNote7, setAutoNote7] = useGunValue<boolean, any>(
    chain.get("autonote7" as MatchSchemaKey)
  );

  const [autoAmp, setAutoAmp] = useGunValue<number, any>(
    chain.get("autoamp" as MatchSchemaKey)
  );
  const [autoSpeaker, setAutoSpeaker] = useGunValue<number, any>(
    chain.get("autospeaker" as MatchSchemaKey)
  );
  const [leave, setLeave] = useGunValue<boolean, any>(
    chain.get("leave" as MatchSchemaKey)
  );

  // const { currentViewingAngle, setCurrentViewingAngle } = usePositionStore();

  return (
    <>
      <Group>
        <img
          width={450}
          src="/auto_locations_source_2024.png"
          alt="Source side field view"
        />
        <Stack>
          <Radio.Group
            label={"Starting position"}
            value={startingPosition ?? ""}
            onChange={(newPosition) => setStartingPosition(newPosition as any)}
          >
            <Stack>
              <Radio value="a" label="A" />
              <Radio value="b" label="B" />
              <Radio value="c" label="C" />
              <Radio value="d" label="D" />
            </Stack>
          </Radio.Group>
        </Stack>
      </Group>
      <Flex w={"100%"} justify={"space-between"}>
        <Checkbox
          label={"1"}
          checked={autoNote1}
          onChange={(e) => setAutoNote1(e.target.checked)}
        />
        <Checkbox
          label={"2"}
          checked={autoNote2}
          onChange={(e) => setAutoNote2(e.target.checked)}
        />
        <Checkbox
          label={"3"}
          checked={autoNote3}
          onChange={(e) => setAutoNote3(e.target.checked)}
        />
        <Checkbox
          label={"4"}
          checked={autoNote4}
          onChange={(e) => setAutoNote4(e.target.checked)}
        />
        <Checkbox
          label={"5"}
          checked={autoNote5}
          onChange={(e) => setAutoNote5(e.target.checked)}
        />
        <Checkbox
          label={"6"}
          checked={autoNote6}
          onChange={(e) => setAutoNote6(e.target.checked)}
        />
        <Checkbox
          label={"7"}
          checked={autoNote7}
          onChange={(e) => setAutoNote7(e.target.checked)}
        />
      </Flex>

      <StepperInput
        label={"Auto Amp Count"}
        value={autoAmp ?? 0}
        onChange={(newAmpValue) => {
          if (typeof newAmpValue === "string") return;

          setAutoAmp(newAmpValue);
        }}
      />
      <StepperInput
        label={"Auto Speaker Count"}
        value={autoSpeaker ?? 0}
        onChange={(newSpeakerValue) => {
          if (typeof newSpeakerValue === "string") return;

          setAutoSpeaker(newSpeakerValue);
        }}
      />

      <Checkbox
        checked={leave}
        onChange={(e) => setLeave(e.target.checked)}
        label={
          "Left Robot Starting Zone (bumpers must be fully out of the red-shaded RSZ)"
        }
      />

      <Link
        to={"/scout/teleop"}
        style={{
          all: "inherit",
        }}
      >
        <Button>Teleop</Button>
      </Link>
    </>
  );
};
