import { Tile } from "@/src/types/tiles";
import { create } from "zustand";
import { combine } from "zustand/middleware";

type HistoryState = Tile[];
type HistoryActionArg =
  | HistoryState[]
  | ((prev: HistoryState[]) => HistoryState[]);
type CurrentMoveActionArg = number | ((prev: number) => number);

const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null)] as HistoryState[],
      currentMove: 0,
    },
    (set) => ({
      setHistory: (nextHistory: HistoryActionArg) => {
        set((prev) => ({
          history:
            typeof nextHistory === "function"
              ? nextHistory(prev.history)
              : nextHistory,
        }));
      },
      setCurrentMove: (nextCurrentMove: CurrentMoveActionArg) => {
        set((prev) => ({
          currentMove:
            typeof nextCurrentMove === "function"
              ? nextCurrentMove(prev.currentMove)
              : nextCurrentMove,
        }));
      },
      resetTiles: () =>
        set({
          history: [Array(9).fill(null)] as HistoryState[],
          currentMove: 0,
        }),
    }),
  ),
);

export default useGameStore;
