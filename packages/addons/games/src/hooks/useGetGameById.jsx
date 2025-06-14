import { useQuery } from "@tanstack/react-query";
import { GAME_TO_COMPONENT_MAP } from "games/constants";

export default function useGetGameById(gameId) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () =>
      import("../components/Games/" + GAME_TO_COMPONENT_MAP[gameId]),
  });
}
