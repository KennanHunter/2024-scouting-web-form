import { FC } from "react";
import { Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";

export const Scout: FC = () => {
  const location = useLocation();

  const path = location.hash;

  return (
    <>
      <Text>{path}</Text>
      <Outlet />
    </>
  );
};
