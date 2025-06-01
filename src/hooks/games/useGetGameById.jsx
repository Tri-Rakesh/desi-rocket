import { useQuery } from "@tanstack/react-query";
import { GAME_TO_COMPONENT_MAP } from "@/constants/games";

export default function useGetGameById(gameId) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () =>
      import("../../../src/components/Games/" + GAME_TO_COMPONENT_MAP[gameId]),
  });
}
