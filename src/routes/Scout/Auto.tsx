import { Checkbox } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { gunClient } from "../../gunProvider";

export const AutoScout: FC = () => {

  return (
    <>
      <Checkbox label={"Text auto checkbox"} />
      {/* {JSON.stringify(matches)} */}
    </>
  );
};
