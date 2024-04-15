import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import {
  RouteObject,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { Layout } from "./routes/Layout";
import { Scout } from "./routes/Scout/Index";
import { AutoScout } from "./routes/Scout/Auto";
import { Config } from "./routes/Config";

export const routerConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/scout/",
        element: <Scout />,
        children: [
          {
            path: "auto/",
            element: <AutoScout />,
          },
        ],
      },
      {
        path: "/config/",
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
