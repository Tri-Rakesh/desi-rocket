import Games from "games/pages/Games";
import GameById from "games/pages/GameById";

export default {
  children: [
    { index: true, element: <Games /> },
    { path: ":id", element: <GameById /> },
  ],
};
