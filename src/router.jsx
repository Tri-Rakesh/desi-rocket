import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Auth from "desi-rocket/pages/Auth";
import Home from "desi-rocket/pages/Home";
import Games from "desi-rocket/pages/Games";
import GameById from "desi-rocket/pages/games/GameById";

const router = import.meta.env.VITE_USE_HASH_ROUTER
  ? createHashRouter
  : createBrowserRouter;

export default router([
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
