import { Badge, Box, Flex, Paper, Title } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { usePositionStore } from "../stores/usePositionStore";

export const Layout: FC = () => {
  const { currentPosition } = usePositionStore();

  return (
    <>
      <Box
        style={(theme) => ({
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.colors.gray[2],
        })}
      >
        <Paper
          shadow={"md"}
          h={60}
          style={() => ({
            backgroundColor: "white",
          })}
        >
          <Flex align={"center"} h={"100%"} justify={"space-between"} px={"md"}>
            <Flex align={"center"} gap={"sm"}>
              <Title>Galileo Scouting</Title>
              <Badge color={currentPosition.includes("Red") ? "red" : "blue"}>
                {currentPosition}
              </Badge>
            </Flex>
          </Flex>
          <Outlet />
        </Paper>
      </Box>
    </>
  );
};
