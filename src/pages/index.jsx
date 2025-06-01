import { createBrowserRouter } from "react-router-dom";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Games from "@/pages/Games";
import GameById from "@/pages/Games/GameById";

export const router = createBrowserRouter([
  {
    path: import.meta.env.PROD ? "/desi-rocket" : "/",
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
