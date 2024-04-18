import { Title } from "@mantine/core";
import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Page } from "../../elements/Page";
import { useClientSpecificMatchData } from "../../stores/useClientSpecificMatchData";

const toTitleCase = (input: string): string =>
  input
    .split(" ")
    .map((word) => (word[0] ? word[0].toUpperCase() : "") + word.slice(1))
    .join(" ");

export const Scout: FC = () => {
  const { currentTargetTeam } = useClientSpecificMatchData();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/").slice(2);

  useEffect(() => {
    if (!path.at(0) || path.at(0) === "") {
      navigate("/scout/setup");
    }
  });

  return (
    <Page>
      <Title>
        {toTitleCase(path.at(0) ?? "")} - {currentTargetTeam}
      </Title>
      <Outlet />
    </Page>
  );
};
