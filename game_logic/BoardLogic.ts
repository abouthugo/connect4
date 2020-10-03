const RIGHT = "RIGHT";
const LEFT = "LEFT";
const UP = "UP";
const DOWN = "DOWN";
const LEFT_UP = "LEFT_UP";
const LEFT_DOWN = "LEFT_DOWN";
const RIGHT_UP = "RIGHT_UP";
const RIGHT_DOWN = "RIGHT_DOWN";

export function isAWinMove(
  board: string[][],
  s: string,
  ROW: number,
  COLUMN: number,
  count = 0,
  direction?: string
): boolean {
  // base case we found 4 in a row!
  if (count > 2) return true;

  if (direction) {
  }
  const right = countTo(RIGHT, ROW, COLUMN, board, s);
  const left = countTo(LEFT, ROW, COLUMN, board, s);
  const up = countTo(UP, ROW, COLUMN, board, s);
  const down = countTo(DOWN, ROW, COLUMN, board, s);
  const leftUp = countTo(LEFT_UP, ROW, COLUMN, board, s);
  const leftDown = countTo(LEFT_DOWN, ROW, COLUMN, board, s);
  const rightUp = countTo(RIGHT_UP, ROW, COLUMN, board, s);
  const rightDown = countTo(RIGHT_DOWN, ROW, COLUMN, board, s);
  return (
    right + left >= 3 ||
    up + down >= 3 ||
    leftUp + rightDown >= 3 ||
    leftDown + rightUp >= 3
  );
}

/**
 * This is a recursive function to count the number of symbols to the given direction
 * @param direction
 * @param ROW
 * @param COLUMN
 * @param board
 * @param s
 * @param count
 */
function countTo(
  direction: Direction,
  ROW: number,
  COLUMN: number,
  board: string[][],
  s: string
): number {
  switch (direction) {
    case LEFT: {
      if (COLUMN < 1) return 0;
      if (board[ROW][COLUMN - 1] === s)
        return 1 + countTo(direction, ROW, COLUMN - 1, board, s);
      return 0;
    }
    case RIGHT: {
      if (COLUMN > 5) return 0;
      if (board[ROW][COLUMN + 1] === s)
        return 1 + countTo(direction, ROW, COLUMN + 1, board, s);
      return 0;
    }
    case UP: {
      if (ROW < 1) return 0;
      if (board[ROW - 1][COLUMN] === s)
        return 1 + countTo(direction, ROW - 1, COLUMN, board, s);
      return 0;
    }
    case DOWN: {
      if (ROW > 4) return 0;
      if (board[ROW + 1][COLUMN] === s)
        return 1 + countTo(direction, ROW + 1, COLUMN, board, s);
      return 0;
    }
    case RIGHT_UP: {
      if (COLUMN > 5 || ROW < 1) return 0;
      if (board[ROW - 1][COLUMN + 1] === s)
        return 1 + countTo(direction, ROW - 1, COLUMN + 1, board, s);
      return 0;
    }
    case RIGHT_DOWN: {
      if (COLUMN > 5 || ROW > 4) return 0;
      if (board[ROW + 1][COLUMN + 1] === s)
        return 1 + countTo(direction, ROW + 1, COLUMN + 1, board, s);
      return 0;
    }
    case "LEFT_UP": {
      if (COLUMN < 1 || ROW < 1) return 0;
      if (board[ROW - 1][COLUMN - 1] === s)
        return 1 + countTo(direction, ROW - 1, COLUMN - 1, board, s);
      return 0;
    }
    case "LEFT_DOWN": {
      if (COLUMN < 1 || ROW > 4) return 0;
      if (board[ROW + 1][COLUMN - 1] === s)
        return 1 + countTo(direction, ROW + 1, COLUMN - 1, board, s);
      return 0;
    }
  }
}

type Direction =
  | "RIGHT"
  | "LEFT"
  | "UP"
  | "DOWN"
  | "LEFT_UP"
  | "LEFT_DOWN"
  | "RIGHT_UP"
  | "RIGHT_DOWN";
