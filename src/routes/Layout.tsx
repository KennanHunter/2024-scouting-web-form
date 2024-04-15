import { Box, Flex, Paper, Title } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
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
            <Title>Hopper Scouting</Title>
          </Flex>
          <Outlet />
        </Paper>
      </Box>
    </>
  );
};
