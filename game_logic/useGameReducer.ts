import { initializeBoard, initializeTokens } from "lib/utils";
import { Reducer, useReducer } from "react";

const MOVE_RIGHT = "MOVE_RIGHT";
const MOVE_LEFT = "MOVE_LEFT";
const DROP = "DROP";
const SHOW_TOKEN = "SHOW_TOKEN";

function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case MOVE_RIGHT: {
      const { tokenList, currentColumn, tokenOffset } = move("RIGHT");
      return { ...state, tokenList, currentColumn, tokenOffset };
    }
    case MOVE_LEFT: {
      const { tokenList, currentColumn, tokenOffset } = move("LEFT");
      return { ...state, tokenList, currentColumn, tokenOffset };
    }
    case DROP: {
      const row = getAvailableRow();
      console.log(row);
      if (row !== -1) {
        const {
          board,
          currentColumn,
          tokenList,
          tokenIndex,
          currentPlayer,
        } = state;

        const newBoard = [...board];
        newBoard[row][currentColumn] = currentPlayer; // update the board
        const newCurrentPlayer = currentPlayer === "O" ? "X" : "O"; // update the next player
        const newTokenList = tokenList.map((t, index) => {
          if (index === tokenIndex) {
            return { ...t, top: 76 * row };
          }

          return t;
        });
        // TODO CHECK for a win
        return {
          ...state,
          tokenList: newTokenList,
          board: newBoard,
          currentPlayer: newCurrentPlayer,
          tokenIndex: tokenIndex + 1,
          currentColumn: 0,
          tokenOffset: 0,
        };
      }
      return state;
    }
    case SHOW_TOKEN: {
      const { tokenIndex, tokenList } = state;
      const newTokenList = tokenList.map((t, i) => {
        if (i === tokenIndex) return { ...t, active: true };
        return t;
      });
      return { ...state, tokenList: newTokenList };
    }
    default:
      return state;
  }

  /**
   * Helper function to decide where to move
   * @param direction The direction to were to move the token
   */
  function move(direction: "RIGHT" | "LEFT") {
    const { tokenIndex, currentColumn, tokenList, tokenOffset } = state;
    const offset = direction === "RIGHT" ? tokenOffset + 76 : tokenOffset - 76;
    const column =
      direction === "RIGHT" ? currentColumn + 1 : currentColumn - 1;
    const newTokenList = tokenList.map((t, index) => {
      if (tokenIndex === index) {
        return { ...t, offset };
      }
      return t;
    });
    return {
      tokenList: newTokenList,
      currentColumn: column,
      tokenOffset: offset,
    };
  }

  /**
   * Iterates the array from bottom to top and returns the first available cell
   */
  function getAvailableRow() {
    const { board, currentColumn, boardRows } = state;
    console.log(board);
    for (let row = boardRows - 1; row >= 0; row--) {
      if (board[row][currentColumn] === undefined) {
        return row;
      }
    }
    return -1;
  }
}

export default function useGameReducer() {
  const [state, dispatch] = useReducer(gameReducer, {
    gameOver: false,
    boardColumns: 7,
    boardRows: 6,
    board: initializeBoard(7, 6),
    player1Tag: "O",
    player2Tag: "X",
    currentPlayer: "O",
    tokenIndex: 0,
    tokenOffset: 0,
    tokenTop: 0,
    tokenList: initializeTokens("O", "X"),
    currentColumn: 0,
  });

  const moveRight = () => {
    const { tokenOffset, boardColumns } = state;
    if (tokenOffset < 76 * (boardColumns - 1)) {
      console.log("Passed the test");
      dispatch({ type: MOVE_RIGHT });
    }
  };

  const moveLeft = () => {
    const { tokenOffset } = state;
    if (tokenOffset > 0) {
      dispatch({ type: MOVE_LEFT });
    }
  };

  const dropToken = () => {
    dispatch({ type: DROP });
    setTimeout(function () {
      if (!state.gameOver) {
        dispatch({ type: SHOW_TOKEN });
        console.log(dispatch);
        console.log("Dispatched");
      }
    }, 350);
  };

  return { state, moveRight, moveLeft, dropToken };
}

type Action = { type: "MOVE_RIGHT" } | { type: "MOVE_LEFT" } | { type: "DROP" };
