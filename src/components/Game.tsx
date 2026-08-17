"use client";
import calculateWinner from "../helpers/calculateWinner";
import useGameStore from "../app/store/store";
import { Tile } from "../types/tiles";
import Board from "./Board";

export default function Game() {
  const history = useGameStore((state) => state.history);

  const setHistory = useGameStore((state) => state.setHistory);

  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);

  const xIsNext = currentMove % 2 === 0;

  const currentTiles = history[currentMove];

  const winner = calculateWinner(currentTiles);

  const resetTiles = useGameStore((state) => state.resetTiles);
  function handlePlay(nextTiles: Tile[]) {
    const newHistory = history.slice(0, currentMove + 1).concat([nextTiles]);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    const newHistory = history.slice(0, nextMove + 1);
    setHistory(newHistory);
  }

  return (
    <div className="w-full max-w-3xl min-h-128 flex flex-col md:flex-row justify-between items-stretch gap-6">
      <Board
        tiles={currentTiles}
        xIsNext={xIsNext}
        onPlay={handlePlay}
        winner={winner}
      />
      <div className="w-full max-w-100 mx-auto min-h-100  md:min-h-full flex flex-col justify-between bg-yellow-900 border-6 border-yellow-500 rounded-3xl overflow-hidden p-2">
        {history.length > 1 && (
          <ol className="space-y-2">
            {history.map((_, historyIndex) => {
              const label =
                historyIndex > 0
                  ? `Go to move ${historyIndex}`
                  : "Go to game start";
              return (
                historyIndex > 0 && (
                  <li
                    role="button"
                    key={historyIndex}
                    className={`rounded-lg py-2 px-3  ${historyIndex === history.length - 1 ? "bg-gray-200 text-gray-500 pointer-events-none" : "bg-yellow-100"}`}
                    onClick={() => jumpTo(historyIndex)}
                  >
                    {label}
                  </li>
                )
              );
            })}
          </ol>
        )}
        {history.length > 1 && (
          <button
            className={`w-full mt-2 rounded-xl text-white py-3 font-semibold text-lg ${winner ? "bg-green-400" : "bg-sky-500"}`}
            onClick={resetTiles}
          >
            {winner ? "Play again" : "Restart"}
          </button>
        )}
      </div>
    </div>
  );
}
