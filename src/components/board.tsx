'use client'

import { BOARD_SIZE } from '@/constants/board'
import { countDiscs, getFlippableDiscs, hasValidMoves } from '@/libs/utils'
import { BoardState, Disc } from '@/types/othello'
import { useState } from 'react'

const createInitialBoard = (): BoardState => {
  const board: BoardState = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))

  board[3][3] = 'white'
  board[3][4] = 'black'
  board[4][3] = 'black'
  board[4][4] = 'white'

  return board
}

const Board = () => {
  const [board, setBoard] = useState<BoardState>(createInitialBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Disc>('black')

  const { black, white } = countDiscs(board)

  const handleClick = (x: number, y: number) => {
    const flips = getFlippableDiscs(board, x, y, currentPlayer)
    if (flips.length === 0) return

    const newBoard = board.map((row) => [...row])
    newBoard[y][x] = currentPlayer
    flips.forEach(([fx, fy]) => {
      newBoard[fy][fx] = currentPlayer
    })

    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black'

    if (hasValidMoves(newBoard, nextPlayer)) {
      setCurrentPlayer(nextPlayer)
    } else if (hasValidMoves(newBoard, currentPlayer)) {
      // currentPlayerのまま（続投）
      alert(`${nextPlayer}はパスです`)
    } else {
      const winner = black === white ? '引き分け！' : black > white ? '黒の勝ち！' : '白の勝ち！'

      alert(`ゲーム終了！\n黒: ${black}、白: ${white}\n${winner}`)
    }

    setBoard(newBoard)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-bold text-black">
        黒: {black} / 白: {white}
      </div>
      <div className="grid grid-cols-8 grid-rows-8 gap-0.5 border-2 border-neutral-800 bg-[var(--board-green)]">
        {board.map((row, y) => {
          return row.map((cell, x) => {
            return (
              <div
                key={`${x}-${y}`}
                onClick={() => handleClick(x, y)}
                className="w-12 h-12 bg-green-700 hover:bg-green-600 transition-colors flex items-center justify-center cursor-pointer"
              >
                {cell && (
                  <div
                    className={`w-8 h-8 rounded-full ${cell === 'black' ? 'bg-black' : 'bg-white'}`}
                  />
                )}
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default Board
