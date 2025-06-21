import { useParams } from "react-router-dom";
import useGetGameById from "desi-rocket/hooks/games/useGetGameById";

export default function GameById() {
  const { id: gameId } = useParams();
  const game = useGetGameById(gameId);

  return (
    <>
      <h2>Game by name page - {gameId}</h2>
      {game.isLoading && <p>Loading...</p>}
      {game.isError && <p>Error loading game.</p>}
      {game.isSuccess && (
        <div>
          <game.data.default />
        </div>
      )}
    </>
  );
}
