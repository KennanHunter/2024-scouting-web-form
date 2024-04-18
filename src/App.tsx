import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import {
  RouteObject,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { Config } from "./routes/Config";
import { Index } from "./routes/Index";
import { Layout } from "./routes/Layout";
import { AutoScout } from "./routes/Scout/Auto";
import { Scout } from "./routes/Scout/Index";
import { SetupScout } from "./routes/Scout/Setup";
import { theme } from "./theme";
import { TeleopScout } from "./routes/Scout/Teleop";
import { EndgameScout } from "./routes/Scout/Endgame";

export const routerConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "scout/",
        element: <Scout />,
        children: [
          {
            path: "setup/",
            element: <SetupScout />,
          },
          {
            path: "auto/",
            element: <AutoScout />,
          },
          {
            path: "teleop/",
            element: <TeleopScout />,
          },
          {
            path: "endgame/",
            element: <EndgameScout />,
          },
        ],
      },
      {
        path: "config/",
        element: <Config />,
      },
    ],
  },
] satisfies RouteObject[];

const router = createHashRouter(routerConfig);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
