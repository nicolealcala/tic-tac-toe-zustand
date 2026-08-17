import type { Tile } from "../types/tiles";

type TileProps = {
  value: Tile;
  onTileClick: () => void;
};

export default function Tile({ value, onTileClick }: TileProps) {
  return (
    <button
      className={`inline-flex items-center justify-center p-0 outline-none text-5xl font-semibold font-brand ${value === "X" ? "bg-amber-50 text-red-500" : value === "O" ? "bg-red-500 text-amber-50" : "bg-white"}`}
      onClick={onTileClick}
    >
      {value}
    </button>
  );
}
