import { initializeBoard, initializeTokens } from "lib/utils";
import { useReducer } from "react";
import { isAWinMove } from "./BoardLogic";

const MOVE_RIGHT = "MOVE_RIGHT";
const MOVE_LEFT = "MOVE_LEFT";
const DROP = "DROP";
const NEXT_TURN = "NEXT_TURN";
const SET_NAME = "SET_NAME";

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

      if (row !== -1) {
        const {
          board,
          currentColumn,
          tokenList,
          tokenIndex,
          currentPlayer,
        } = state;

        const newBoard = [...board];
        newBoard[row][currentColumn] = currentPlayer.tag; // update the board
        const newTokenList = tokenList.map((t, index) => {
          if (index === tokenIndex) {
            return { ...t, top: 76 * row };
          }
          return t;
        });
        const gameOver = isAWinMove(
          newBoard,
          currentPlayer.tag,
          row,
          currentColumn
        );

        return {
          ...state,
          tokenList: newTokenList,
          board: newBoard,
          tokenIndex: tokenIndex + 1,
          currentColumn: 0,
          tokenOffset: 0,
          gameOver,
        };
      }
      return state;
    }
    case NEXT_TURN: {
      const {
        tokenIndex,
        tokenList,
        gameOver,
        currentPlayer,
        player1,
        player2,
      } = state;
      if (gameOver) return state;
      const nextPlayer = currentPlayer.tag === "O" ? player2 : player1; // update the next player
      const newTokenList = tokenList.map((t, i) => {
        if (i === tokenIndex) return { ...t, active: true };
        return t;
      });
      return {
        ...state,
        tokenList: newTokenList,
        currentPlayer: nextPlayer,
      };
    }
    case SET_NAME: {
      const { name } = action.payload;
      const { player1 } = state;
      // TODO: change logic for current player, it should be set once the game starts not prior
      const py = { ...player1, name };
      return { ...state, player1: py, currentPlayer: py, gameReady: true };
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
    for (let row = boardRows - 1; row >= 0; row--) {
      if (board[row][currentColumn] === undefined) {
        return row;
      }
    }
    return -1;
  }
}

export default function useGameReducer() {
  const player1 = {
    name: "",
    tag: "O",
    wins: 0,
  };

  const player2 = {
    name: "AI",
    tag: "X",
    wins: 0,
  };

  const currentPlayer = player1;

  const [state, dispatch] = useReducer(gameReducer, {
    gameOver: false,
    boardColumns: 7,
    boardRows: 6,
    board: initializeBoard(7, 6),
    player1,
    player2,
    currentPlayer,
    gameReady: false,
    tokenIndex: 0,
    tokenOffset: 0,
    tokenTop: 0,
    tokenList: initializeTokens("O", "X"),
    currentColumn: 0,
  });

  const moveRight = () => {
    const { tokenOffset, boardColumns } = state;
    if (tokenOffset < 76 * (boardColumns - 1)) {
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
      dispatch({ type: NEXT_TURN });
    }, 350);
  };

  const stateMyName = (name: string) => {
    dispatch({ type: SET_NAME, payload: { name } });
  };

  return { state, moveRight, moveLeft, dropToken, stateMyName };
}

type Action = { type: "MOVE_RIGHT" } | { type: "MOVE_LEFT" } | { type: "DROP" };
