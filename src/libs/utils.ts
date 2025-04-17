import { BOARD_SIZE, DIRECTIONS } from '@/constants/board'
import { BoardStateType, DiscType } from '@/types/othello'

const inBounds = (x: number, y: number) => x >= 0 && y >= 0 && x < BOARD_SIZE && y < BOARD_SIZE

export const getFlippableDiscs = (
  board: BoardStateType,
  x: number,
  y: number,
  player: DiscType
): [number, number][] => {
  if (board[y][x] !== null) return []
  const opponent: DiscType = player === 'black' ? 'white' : 'black'
  const flippable: [number, number][] = []

  for (const [dx, dy] of DIRECTIONS) {
    const path: [number, number][] = []
    let step = 1

    while (true) {
      const nx = x + dx * step
      const ny = y + dy * step

      if (!inBounds(nx, ny) || board[ny][nx] === null) {
        // 枠外か空マスに達したら打ち切り
        break
      }
      if (board[ny][nx] === opponent) {
        // 相手コマが続く限り path に追加
        path.push([nx, ny])
      } else {
        // 自分コマにたどり着いたら path をひっくり返し対象に
        if (path.length > 0 && board[ny][nx] === player) {
          flippable.push(...path)
        }
        break
      }
      step++
    }
  }

  return flippable
}

export const hasValidMoves = (board: BoardStateType, player: DiscType) =>
  board.some((row, y) => row.some((_, x) => getFlippableDiscs(board, x, y, player).length > 0))

export const countDiscs = (board: BoardStateType) =>
  board.reduce(
    (acc, row) =>
      row.reduce((c, cell) => {
        if (cell === 'black') c.black++
        if (cell === 'white') c.white++
        return c
      }, acc),
    { black: 0, white: 0 }
  )
