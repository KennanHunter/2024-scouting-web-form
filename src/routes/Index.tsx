import { Button } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Page } from "../elements/Page";

export const Index: FC = () => {
  return (
    <Page>
      <Link
        to={"/scout/setup"}
        style={{
          all: "inherit",
        }}
      >
        <Button>Start Scouting</Button>
      </Link>
      <Link
        to={"/config"}
        style={{
          all: "inherit",
        }}
      >
        <Button>Configuration</Button>
      </Link>
      <Link
        to={"/export"}
        style={{
          all: "inherit",
        }}
      >
        <Button>Export</Button>
      </Link>
    </Page>
  );
};
