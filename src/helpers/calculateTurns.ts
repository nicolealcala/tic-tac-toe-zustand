import { Tile } from "../types/tiles";

export default function calculateTurns(tiles: Tile[]) {
  return tiles.filter((tile) => !tile).length;
}
