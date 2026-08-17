import { Tile } from "../types/tiles";

export default function calculateStatus(
  winner: Tile,
  turns: number,
  player: string,
) {
  if (!winner && !turns) return "Draw";
  if (winner) return `Winner: ${winner}`;
  return `Next player: ${player}`;
}
