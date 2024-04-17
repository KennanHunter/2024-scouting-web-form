import { Checkbox } from "@mantine/core";
import { FC } from "react";
import { useGunValue } from "../../hooks/useGunValue";
import { gunClient } from "../../gunProvider";
import { useClientSpecificMatchData } from "../../stores/useClientSpecificMatchData";
import { useEventStore } from "../../stores/useEventStore";

export const AutoScout: FC = () => {
  const { currentMatch, currentTargetTeam } = useClientSpecificMatchData();
  const { currentEventKey } = useEventStore();

  const [testCheckbox, setTestCheckbox] = useGunValue<boolean, any>(
    gunClient.get(currentEventKey).get("matches").get(currentMatch.toString())
  );

  return (
    <>
      <Checkbox
        label={"Text auto checkbox"}
        // disabled={!testCheckboxValid}
        checked={testCheckbox}
        onChange={(e) => setTestCheckbox(e.target.checked)}
      />
      {/* {JSON.stringify(matches)} */}
    </>
  );
};
