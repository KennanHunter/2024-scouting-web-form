import { create } from "zustand";
import { persist } from "zustand/middleware";

type AllianceColor = "Red" | "Blue";
type PositionNumber = 1 | 2 | 3;

export type Position = `${AllianceColor} ${PositionNumber}`;
type PositionStore = {
  currentPosition: Position;
  setCurrentPosition: (newPosition: Position) => void;
};

export const usePositionStore = create<PositionStore>()(
  persist(
    (set) => ({
      currentPosition: "Red 1",
      setCurrentPosition: (newPosition: Position) => {
        set({
          currentPosition: newPosition,
        });
      },
    }),
    { name: "positionStore" }
  )
);
