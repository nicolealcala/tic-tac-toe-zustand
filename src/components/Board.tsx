"use client";
import calculateStatus from "../helpers/calculateStatus";
import calculateTurns from "../helpers/calculateTurns";

import type { Tile as TileType } from "../types/tiles";
import Tile from "./Tile";

type BoardProps = {
  xIsNext: boolean;
  tiles: TileType[];
  winner: TileType;
  onPlay: (tiles: TileType[]) => void;
};
export default function Board({ tiles, xIsNext, winner, onPlay }: BoardProps) {
  const player = xIsNext ? "X" : "O";

  const turns = calculateTurns(tiles);
  const status = calculateStatus(winner, turns, player);

  const handleClick = (index: number) => {
    if (tiles[index] || winner) return;

    const nextTiles = [...tiles];
    nextTiles[index] = player;
    onPlay(nextTiles);
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="my-5">{status}</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-1.5 w-100 h-100 border-6 bg-amber-200 border-amber-200 rounded-3xl overflow-hidden">
        {tiles.map((tile, tileIndex) => (
          <Tile
            key={tileIndex}
            value={tile}
            onTileClick={() => handleClick(tileIndex)}
          />
        ))}
      </div>
    </div>
  );
}
