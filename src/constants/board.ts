export const BOARD_SIZE = 8

/**  x方向(dx), y方向(dy) の順で定義 */
export const DIRECTIONS: [number, number][] = [
  [0, -1], // 上
  [1, -1], // 右上
  [1, 0], // 右
  [1, 1], // 右下
  [0, 1], // 下
  [-1, 1], // 左下
  [-1, 0], // 左
  [-1, -1] // 左上
]
