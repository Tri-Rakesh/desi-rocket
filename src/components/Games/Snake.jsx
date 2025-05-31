import { useEffect, useState, useRef, useCallback } from "react";

const INTERVAL = 50;
const GRID_SIZE = 50;
const GAME_START_KEY_CODE = "Space";
const VALID_KEY_CODES = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

const cellBackgroundColor = (cellPos, snakePosList, foodPos) => {
  if (snakePosList.at(-1) && isPosEqual(snakePosList.at(-1), cellPos)) {
    return "blue"; // Head of the snake
  }

  if (snakePosList.find((snakePos) => isPosEqual(snakePos, cellPos))) {
    return "green"; // Snake's position
  }
  if (foodPos && isPosEqual(foodPos, cellPos)) {
    return "red"; // Food's position
  }
  return "white"; // Default background color
};

const getNewSnakePosition = (snakePosList, direction) => {
  const makeSnakeCrossable = ({ x, y }) => {
    const nX = x < 0 ? GRID_SIZE - 1 : x % GRID_SIZE;
    const nY = y < 0 ? GRID_SIZE - 1 : y % GRID_SIZE;

    return { x: nX, y: nY };
  };

  return snakePosList.map((snakePos, index) => {
    if (index !== snakePosList.length - 1) {
      return snakePosList[index + 1];
    }

    switch (direction) {
      case "ArrowUp":
        return makeSnakeCrossable({ x: snakePos.x, y: snakePos.y - 1 });
      case "ArrowDown":
        return makeSnakeCrossable({ x: snakePos.x, y: snakePos.y + 1 });
      case "ArrowLeft":
        return makeSnakeCrossable({ x: snakePos.x - 1, y: snakePos.y });
      case "ArrowRight":
        return makeSnakeCrossable({ x: snakePos.x + 1, y: snakePos.y });
      default:
        return snakePos;
    }
  });
};

const isPosEqual = (pos1, pos2) => {
  if (!pos1 || !pos2) return false;

  return pos1.x === pos2.x && pos1.y === pos2.y;
};

const calculateNextFoodPosition = (currentFoodPos, snakePosList) => {
  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  });

  let newFoodPos = getRandomPosition();

  while (
    snakePosList.some((snakePos) => isPosEqual(snakePos, newFoodPos)) ||
    isPosEqual(newFoodPos, currentFoodPos)
  ) {
    newFoodPos = getRandomPosition();
  }

  return newFoodPos;
};

export default function Snake() {
  const [snakeDirection, setSnakeDirection] = useState("ArrowRight");
  const [started, setStarted] = useState(false);
  const [foodPos, setFoodPos] = useState({ x: 6, y: 5 });
  const [intervalId, setIntervalId] = useState(null);
  const [snakePosList, setSnakePosList] = useState([
    ...Array.from({ length: 30 }, (_, index) => ({
      x: index + 5,
      y: 5,
    })),
  ]);

  const containerRef = useRef(null);

  const keyDropwdownHandler = useCallback(
    (event) => {
      if (event.code === GAME_START_KEY_CODE) {
        setStarted(!started);
        return;
      }

      if (!VALID_KEY_CODES.includes(event.code)) {
        return;
      }

      if (started && snakePosList.length > 1) {
        if (
          snakeDirection === "ArrowRight" &&
          ["ArrowRight", "ArrowLeft"].includes(event.code)
        ) {
          return;
        }

        if (
          snakeDirection === "ArrowLeft" &&
          ["ArrowRight", "ArrowLeft"].includes(event.code)
        ) {
          return;
        }

        if (
          snakeDirection === "ArrowUp" &&
          ["ArrowUp", "ArrowDown"].includes(event.code)
        ) {
          return;
        }

        if (
          snakeDirection === "ArrowDown" &&
          ["ArrowUp", "ArrowDown"].includes(event.code)
        ) {
          return;
        }
      }

      clearInterval(intervalId);
      setSnakeDirection(event.code);
    },
    [started, snakePosList, intervalId, snakeDirection]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.addEventListener("keydown", keyDropwdownHandler);

    return () => {
      if (container) {
        document.removeEventListener("keydown", keyDropwdownHandler);
      }
    };
  }, [keyDropwdownHandler]);

  useEffect(() => {
    if (!started) return;

    const tempIntervalId = setInterval(() => {
      setSnakePosList((currentSnakePosList) => {
        if (isPosEqual(currentSnakePosList.at(-1), foodPos)) {
          setTimeout(() => setFoodPos(null), 0);
          setTimeout(
            () =>
              setFoodPos(
                calculateNextFoodPosition(foodPos, currentSnakePosList)
              ),
            1_000
          );
          return getNewSnakePosition(
            [...currentSnakePosList, foodPos],
            snakeDirection
          );
        }
        return getNewSnakePosition(currentSnakePosList, snakeDirection);
      });
    }, INTERVAL);

    setIntervalId(tempIntervalId);

    return () => clearInterval(tempIntervalId);
  }, [started, snakeDirection, foodPos]);

  return (
    <div>
      <h2>Snake Game - {snakePosList.length}</h2>
      <button onClick={() => setStarted(!started)} type="button">
        {started ? "Stop" : "Start"}
      </button>
      <div
        style={{
          border: "1px solid black",
          width: "fit-content",
          fontSize: "0.5rem",
        }}
        ref={containerRef}
      >
        {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {Array.from({ length: GRID_SIZE }).map((_, cellIndex) => (
              <div
                className="cell"
                key={cellIndex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "10px",
                  height: "10px",
                  // border: "1px solid black",
                  backgroundColor: cellBackgroundColor(
                    { x: cellIndex, y: rowIndex },
                    snakePosList,
                    foodPos
                  ),
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
