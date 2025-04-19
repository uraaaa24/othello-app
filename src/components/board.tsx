'use client'

import { BOARD_SIZE } from '@/constants/board'
import { countDiscs, getFlippableDiscs, hasValidMoves } from '@/libs/utils'
import { BoardStateType, DiscType } from '@/types/othello'
import { useState } from 'react'
import Disc from './disc'

const createInitialBoard = (): BoardStateType => {
  const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))

  board[3][3] = 'white'
  board[3][4] = 'black'
  board[4][3] = 'black'
  board[4][4] = 'white'

  return board
}

const Board = () => {
  const [board, setBoard] = useState<BoardStateType>(createInitialBoard)
  const [currentPlayer, setCurrentPlayer] = useState<DiscType>('black')
  const { black, white } = countDiscs(board)

  const handleClick = (x: number, y: number) => {
    const flips = getFlippableDiscs(board, x, y, currentPlayer)
    if (!flips.length) return

    const newBoard = board.map((row) => [...row])
    newBoard[y][x] = currentPlayer
    flips.forEach(([fx, fy]) => {
      newBoard[fy][fx] = currentPlayer
    })
    setBoard(newBoard)

    const next = currentPlayer === 'black' ? 'white' : 'black'
    if (hasValidMoves(newBoard, next)) {
      setCurrentPlayer(next)
    } else if (hasValidMoves(newBoard, currentPlayer)) {
      alert(`${next} must pass`)
    } else {
      const winner = black === white ? 'Draw' : black > white ? 'Black wins' : 'White wins'
      alert(`Game over!\nBlack: ${black} / White: ${white}\n${winner}`)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white text-gray-900">
      <div className="flex items-center gap-4 font-medium">
        <span>
          {currentPlayer === 'black' ? '⚫︎' : '⚪︎'}{' '}
          {currentPlayer === 'black' ? "Black's turn" : "White's turn"}
        </span>
        <span>Black: {black}</span>
        <span>White: {white}</span>
      </div>

      <div className="p-3 bg-green-400 rounded-lg">
        <div className="grid grid-cols-8 grid-rows-8 border border-green-500">
          {board.map((row, y) =>
            row.map((cell, x) => (
              <button
                key={`${x}-${y}`}
                onClick={() => handleClick(x, y)}
                className="w-16 h-16 bg-transparent border border-green-500 flex items-center justify-center hover:bg-green-300 focus:outline-none"
              >
                {cell && <Disc color={cell} />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Board
