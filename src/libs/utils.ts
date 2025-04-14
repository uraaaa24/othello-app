import { BOARD_SIZE, DIRECTIONS } from '@/constants/board'
import { BoardState, Disc } from '@/types/othello'

export const getFlippableDiscs = (
  board: BoardState,
  x: number,
  y: number,
  player: Disc
): [number, number][] => {
  const opponent: Disc = player === 'black' ? 'white' : 'black'
  const flippable: [number, number][] = []

  // 既に駒がある場合は無視
  if (board[y][x] !== null) return []

  for (const [dy, dx] of DIRECTIONS) {
    const path: [number, number][] = []
    let nx = x + dx
    let ny = y + dy

    while (nx >= 0 && ny >= 0 && nx < BOARD_SIZE && ny < BOARD_SIZE && board[ny][nx] === opponent) {
      path.push([nx, ny])
      nx += dx
      ny += dy
    }

    if (
      path.length > 0 &&
      nx >= 0 &&
      ny >= 0 &&
      nx < BOARD_SIZE &&
      ny < BOARD_SIZE &&
      board[ny][nx] === player
    ) {
      flippable.push(...path)
    }
  }

  return flippable
}

export const hasValidMoves = (board: BoardState, player: Disc): boolean => {
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const flips = getFlippableDiscs(board, x, y, player)
      if (flips.length > 0) return true
    }
  }
  return false
}

export const countDiscs = (board: BoardState): { black: number; white: number } => {
  let black = 0
  let white = 0

  for (const row of board) {
    for (const cell of row) {
      if (cell === 'black') black++
      else if (cell === 'white') white++
    }
  }

  return { black, white }
}
