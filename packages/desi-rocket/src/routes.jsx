import Auth from "desi-rocket/pages/Auth";
import Home from "desi-rocket/pages/Home";
import GameRoutes from "games/routes";

export default {
  path: "/",
  element: <Auth />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "games",
      ...GameRoutes,
    },
  ],
};
