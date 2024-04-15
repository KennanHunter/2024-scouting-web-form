import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Layout } from "./routes/Layout";
import { Scout } from "./routes/Scout/Index";
import { AutoScout } from "./routes/Scout/Auto";

const router = createHashRouter([
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
    ],
  },
]);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
