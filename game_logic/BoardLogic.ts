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
    switch (direction) {
      case "LEFT": {
        if (COLUMN < 1) return false;
        if (board[ROW][COLUMN - 1] === s) {
          return isAWinMove(board, s, ROW, COLUMN - 1, count + 1, "LEFT");
        } else {
          return false;
        }
      }
      case "RIGHT": {
        if (COLUMN > 5) return false;
        if (board[ROW][COLUMN + 1] === s) {
          return isAWinMove(board, s, ROW, COLUMN + 1, count + 1, "RIGHT");
        } else {
          return false;
        }
      }
      case "DOWN": {
        if (ROW > 4) return false;
        if (board[ROW + 1][COLUMN] === s) {
          return isAWinMove(board, s, ROW + 1, COLUMN, count + 1, "DOWN");
        } else {
          return false;
        }
      }
      case "UP": {
        if (ROW < 1) return false;
        if (board[ROW - 1][COLUMN] === s) {
          return isAWinMove(board, s, ROW - 1, COLUMN, count + 1, "UP");
        } else {
          return false;
        }
      }
      case "RIGHT_UP": {
        if (COLUMN > 5 || ROW < 1) return false;
        if (board[ROW - 1][COLUMN + 1] === s)
          return isAWinMove(
            board,
            s,
            ROW - 1,
            COLUMN + 1,
            count + 1,
            "RIGHT_UP"
          );

        return false;
      }
      case "RIGHT_DOWN": {
        if (COLUMN > 5 || ROW > 4) return false;
        if (board[ROW + 1][COLUMN + 1] === s)
          return isAWinMove(
            board,
            s,
            ROW + 1,
            COLUMN + 1,
            count + 1,
            "RIGHT_DOWN"
          );

        return false;
      }
      case "LEFT_UP": {
        if (COLUMN < 1 || ROW < 1) return false;
        if (board[ROW - 1][COLUMN - 1] === s)
          return isAWinMove(
            board,
            s,
            ROW - 1,
            COLUMN - 1,
            count + 1,
            "LEFT_UP"
          );

        return false;
      }
      case "LEFT_DOWN": {
        if (COLUMN < 1 || ROW > 4) return false;
        if (board[ROW + 1][COLUMN - 1] === s)
          return isAWinMove(
            board,
            s,
            ROW + 1,
            COLUMN - 1,
            count + 1,
            "LEFT_DOWN"
          );

        return false;
      }
    }
  }
  const right = isAWinMove(board, s, ROW, COLUMN, 0, "RIGHT");
  const left = isAWinMove(board, s, ROW, COLUMN, 0, "LEFT");
  const up = isAWinMove(board, s, ROW, COLUMN, 0, "UP");
  const down = isAWinMove(board, s, ROW, COLUMN, 0, "DOWN");
  const leftUp = isAWinMove(board, s, ROW, COLUMN, 0, "LEFT_UP");
  const leftDown = isAWinMove(board, s, ROW, COLUMN, 0, "LEFT_DOWN");
  const rightUp = isAWinMove(board, s, ROW, COLUMN, 0, "RIGHT_UP");
  const rightDown = isAWinMove(board, s, ROW, COLUMN, 0, "RIGHT_DOWN");
  return (
    right || left || up || down || leftUp || leftDown || rightUp || rightDown
  );
}
