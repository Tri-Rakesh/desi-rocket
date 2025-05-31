import { useParams } from "react-router-dom";
import Snake from "../../components/Games/Snake";

export default function GameByName() {
  const { name: gameName } = useParams();

  return (
    <>
      <h2>Game by name page - {gameName}</h2>
      <Snake />
    </>
  );
}
