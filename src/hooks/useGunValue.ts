import { IGunChain, IGunInstance } from "gun";
import { useState } from "react";

export const useGunValue = <
  T extends unknown,
  U extends IGunChain<{}, IGunInstance<{}>, IGunInstance<{}>, string>
>(
  gunValue: U | undefined
) => {
  const [value, setValue] = useState<T>();

  if (!gunValue) throw new Error("No DB binding provided to useGunValue");

  gunValue.on(
    (data) => {
      // TODO: make sure that this equals always prevents infinite rerenders for more complex objects
      if (value === data) return;
      setValue(data as any);
    },
    {
      change: true,
    }
  );

  const setLocalAndGun: React.SetStateAction<T> = (value) => {
    gunValue.put(value as any, undefined, {});
    return value;
  };

  return [value, setLocalAndGun] as const;
};
