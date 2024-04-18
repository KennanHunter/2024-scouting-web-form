import { IGunChain, IGunInstance } from "gun";
import { useEffect, useState } from "react";

export const useGunValue = <
  T extends unknown,
  U extends IGunChain<{}, IGunInstance<{}>, IGunInstance<{}>, string>
>(
  gunValue: U | undefined
) => {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    if (!gunValue) throw new Error("No DB binding provided to useGunValue");

    gunValue.on(
      (data) => {
        console.dir({ value, status: "gun value updated" });

        // TODO: make sure that this equals always prevents infinite rerenders for more complex objects
        if (value === data) return;
        setValue(data as any);
      },
      {
        change: true,
      }
    );
  }, [gunValue]);

  const setLocalAndGun: React.SetStateAction<T> = (value) => {
    if (!gunValue) throw new Error("No DB binding provided to useGunValue");

    gunValue.put(value as any, undefined, {});
    return value;
  };

  return [value, setLocalAndGun] as const;
};
