import { Center, Paper, Stack } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Center>
      <Paper p={"lg"} mt={"md"}>
        <Stack>{children}</Stack>
      </Paper>
    </Center>
  );
};
