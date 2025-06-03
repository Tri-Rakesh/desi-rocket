import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Games from "@/pages/Games";
import GameById from "@/pages/Games/GameById";

export const router = (
  import.meta.env.PROD ? createHashRouter : createBrowserRouter
)([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "games",
        children: [
          { index: true, element: <Games /> },
          { path: ":id", element: <GameById /> },
        ],
      },
    ],
  },
]);
