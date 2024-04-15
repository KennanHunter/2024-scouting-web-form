import { Center, Paper, Select } from "@mantine/core";
import { FC } from "react";
import { Position, usePositionStore } from "../stores/usePositionStore";

export const Config: FC = () => {
  const { currentPosition, setCurrentPosition } = usePositionStore();

  return (
    <Center>
      <Paper p={"lg"} m={"sm"}>
        <Select
          value={currentPosition}
          data={
            ["Red", "Blue"].flatMap((color) => [
              `${color} 1`,
              `${color} 2`,
              `${color} 3`,
            ]) as Position[]
          }
          onChange={(val) => setCurrentPosition(val as Position)}
        />
      </Paper>
    </Center>
  );
};
