import { useParams } from "react-router-dom";
import useGetGameById from "@/hooks/games/useGetGameById";

export default function GameByName() {
  const { id: gameId } = useParams();
  const getGameById = useGetGameById(gameId);

  return (
    <>
      <h2>Game by name page - {gameId}</h2>
      {getGameById.isLoading && <p>Loading...</p>}
      {getGameById.isError && <p>Error loading game.</p>}
      {getGameById.isSuccess && (
        <div>
          <getGameById.data.default />
        </div>
      )}
    </>
  );
}
