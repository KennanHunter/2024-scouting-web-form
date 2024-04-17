import { Center, Paper, Stack, Title } from "@mantine/core";
import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const toTitleCase = (input: string): string =>
  input
    .split(" ")
    .map((word) => (word[0] ? word[0].toUpperCase() : "") + word.slice(1))
    .join(" ");

export const Scout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/").slice(2);

  useEffect(() => {
    if (!path.at(0) || path.at(0) === "") {
      navigate("/scout/auto");
    }
  });

  return (
    <Center>
      <Paper p={"lg"} mt={"md"}>
        <Stack>
          <Title>{toTitleCase(path.at(0) ?? "")}</Title>
          <Outlet />
        </Stack>
      </Paper>
    </Center>
  );
};
