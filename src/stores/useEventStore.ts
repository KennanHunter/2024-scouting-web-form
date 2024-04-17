import { create } from "zustand";
import { persist } from "zustand/middleware";

type EventStore = {
  currentEventKey: string;
  setCurrentEventKey: (eventKey: string) => void;
};

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      currentEventKey: "",
      setCurrentEventKey: (eventKey) => {
        set({ currentEventKey: eventKey });
      },
    }),
    { name: "eventStore" }
  )
);
