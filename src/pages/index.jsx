import Home from "./Home";
import Games from "./Games";
import GameByName from "./Games/GameByName";
import Auth from "./Auth";

export default {
  Auth,
  Home,
  Games: {
    Index: Games,
    ByName: GameByName,
  },
};
