import { Button, Checkbox, Flex, Group, Radio, Stack } from "@mantine/core";
import { FC } from "react";
import { StepperInput } from "../../elements/StepperInput";
import { useGunValue } from "../../hooks/useGunValue";
import { MatchSchemaKey } from "../../matchDataSchema";
import { useGunChain } from "../../stores/useGunChain";
import { Link } from "react-router-dom";

export const TeleopScout: FC = () => {
  const chain = useGunChain();

  const [climbTime, setClimbTime] = useGunValue<number, any>(
    chain.get("climbtime" as MatchSchemaKey)
  );
  const [onstageOrder, setOnstageOrder] = useGunValue<number, any>(
    chain.get("onstageorder" as MatchSchemaKey)
  );
  const [harmonizeQuantity, setHarmonizeQuantity] = useGunValue<number, any>(
    chain.get("harmonizeqty" as MatchSchemaKey)
  );

  const [buddy, setBuddy] = useGunValue<boolean, any>(
    chain.get("buddy" as MatchSchemaKey)
  );

  const [sourcePickup, setSourcePickup] = useGunValue<number, any>(
    chain.get("sourcepickup" as MatchSchemaKey)
  );

  const [underStage, setUnderStage] = useGunValue<boolean, any>(
    chain.get("understage" as MatchSchemaKey)
  );

  const [playedDefense, setPlayedDefense] = useGunValue<boolean, any>(
    chain.get("playeddefense" as MatchSchemaKey)
  );

  const [receivedDefense, setReceivedDefense] = useGunValue<number, any>(
    chain.get("receiveddefense" as MatchSchemaKey)
  );

  const [died, setDied] = useGunValue<boolean, any>(
    chain.get("died" as MatchSchemaKey)
  );

  const [tipped, setTipped] = useGunValue<boolean, any>(
    chain.get("tipped" as MatchSchemaKey)
  );

  const [broke, setBroke] = useGunValue<boolean, any>(
    chain.get("broke" as MatchSchemaKey)
  );

  return (
    <>
      <Group>
        <img src="/shooting_locations_2024.jpg" width={400} alt="" />
        <Stack>
          <StepperInput
            value={climbTime}
            onChange={(value) => {
              if (typeof value === "string") return;
              setClimbTime(value);
            }}
            label={"Time Climb Started"}
          />
          <Radio.Group
            label={"Order Onstage (same chain)"}
            value={(onstageOrder ?? 0).toString()}
            onChange={(newPosition) =>
              setOnstageOrder(Number.parseInt(newPosition) || 0)
            }
          >
            <Stack>
              <Radio value={"1"} label="First" />
              <Radio value={"2"} label="Second" />
              <Radio value={"3"} label="Third" />
              <Radio value={"4"} label="Park" />
            </Stack>
          </Radio.Group>

          <Radio.Group
            label={"Order Onstage (same chain)"}
            value={(harmonizeQuantity ?? 0).toString()}
            onChange={(newPosition) =>
              setHarmonizeQuantity(Number.parseInt(newPosition) || 0)
            }
          >
            <Stack>
              <Radio value={"1"} label="1" />
              <Radio value={"2"} label="2" />
            </Stack>
          </Radio.Group>

          <Checkbox
            checked={buddy}
            label={"Provided Climb Assistance (for same chain)"}
            onChange={(e) => setBuddy(e.target.checked)}
          />

          <Checkbox
            label={"Source Pick Up"}
            checked={!!sourcePickup}
            onChange={(e) => setSourcePickup(e.target.checked ? 1 : 0)}
          />

          <Checkbox
            label={"Drove Under Stage"}
            checked={underStage}
            onChange={(e) => setUnderStage(e.target.checked)}
          />

          <Checkbox
            label={"Played defense"}
            checked={playedDefense}
            onChange={(e) => setPlayedDefense(e.target.checked)}
          />
        </Stack>
      </Group>

      <Flex gap={"lg"}>
        <Stack>
          <Radio.Group
            label={"Defense Received"}
            value={(receivedDefense ?? 0).toString()}
            onChange={(newPosition) =>
              setReceivedDefense(Number.parseInt(newPosition) || 0)
            }
          >
            <Stack>
              <Radio value={"0"} label="None" />
              <Radio value={"1"} label="Light" />
              <Radio value={"2"} label="Heavy" />
            </Stack>
          </Radio.Group>
        </Stack>
        <Stack>
          <Checkbox
            label={
              "Died (stopped moving due to comms issues, electrical problems or other)"
            }
            checked={died}
            onChange={(e) => setDied(e.target.checked)}
          />
          <Checkbox
            label={"Tipped (completely)"}
            checked={tipped}
            onChange={(e) => setTipped(e.target.checked)}
          />
          <Checkbox
            label={"Broke (sustained damage)"}
            checked={broke}
            onChange={(e) => setBroke(e.target.checked)}
          />
        </Stack>
      </Flex>

      <Link
        to={"/scout/endgame"}
        style={{
          all: "inherit",
        }}
      >
        <Button>Endgame</Button>
      </Link>
    </>
  );
};
