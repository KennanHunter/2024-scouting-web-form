import { useMemo } from "react";
import { gunClient } from "../gunProvider";
import { useClientSpecificMatchData } from "./useClientSpecificMatchData";
import { useEventStore } from "./useEventStore";

export const useGunChain = () => {
  const { currentMatch } = useClientSpecificMatchData();
  const { currentEventKey } = useEventStore();

  return useMemo(
    () =>
      gunClient
        .get(currentEventKey)
        .get("matches")
        .get(currentMatch.toString()),
    [currentEventKey, currentMatch]
  );
};
