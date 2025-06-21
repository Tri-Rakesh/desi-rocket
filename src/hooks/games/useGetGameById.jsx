import { useQuery } from "@tanstack/react-query";
import { GAME_TO_COMPONENT_MAP } from "desi-rocket/constants/games";

export default function useGetGameById(gameId) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () =>
      import("../../components/games/" + GAME_TO_COMPONENT_MAP[gameId]),
  });
}
