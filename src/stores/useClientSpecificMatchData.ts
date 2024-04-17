import { create } from "zustand";
import { persist } from "zustand/middleware";

type ClientSpecificMatchData = {
  currentMatch: number | undefined;
  setCurrentMatch: (newCurrentMatch: number) => void;
  currentTargetTeam: number | undefined;
  setCurrentTargetTeam: (newCurrentTargetTeam: number | undefined) => void;
};

export const useClientSpecificMatchData = create<ClientSpecificMatchData>()(
  persist(
    (set) => ({
      currentMatch: 0,
      setCurrentMatch: (newCurrentMatch) => {
        set({ currentMatch: newCurrentMatch });
      },

      currentTargetTeam: 0,
      setCurrentTargetTeam: (newCurrentTargetTeam) => {
        set({ currentTargetTeam: newCurrentTargetTeam });
      },
    }),
    { name: "eventStore" }
  )
);
