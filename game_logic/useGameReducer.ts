import { initializeBoard, initializeTokens } from "lib/utils";
import { useReducer } from "react";
import { isAWinMove } from "./BoardLogic";
import socket from "../lib/socket";
import { string } from "prop-types";

const MOVE_RIGHT = "MOVE_RIGHT";
const MOVE_LEFT = "MOVE_LEFT";
const DROP = "DROP";
const NEXT_TURN = "NEXT_TURN";
const SET_NAME = "SET_NAME";
const RESTART = "RESTART";

function gameReducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case MOVE_RIGHT: {
      if (!safeGuard()) return state;
      const { tokenList, currentColumn, tokenOffset } = move("RIGHT");
      return { ...state, tokenList, currentColumn, tokenOffset };
    }
    case MOVE_LEFT: {
      if (!safeGuard()) return state;
      const { tokenList, currentColumn, tokenOffset } = move("LEFT");
      return { ...state, tokenList, currentColumn, tokenOffset };
    }
    case DROP: {
      const {
        board,
        currentColumn,
        tokenList,
        tokenIndex,
        currentPlayer,
        me,
        opponent,
      } = state;
      if (!currentPlayer || !me || !opponent) return state;
      const row = getAvailableRow();

      if (row !== -1) {
        // update the board -->
        const newBoard = [...board];
        newBoard[row][currentColumn] =
          currentPlayer === me.id ? me.tag : opponent.tag;
        // <--

        // Update the token list -->
        const newTokenList = tokenList.map((t, index) => {
          if (index === tokenIndex) {
            return { ...t, top: 76 * row };
          }
          return t;
        });
        // <--

        // See if this is a win move -->
        const gameOver = isAWinMove(
          newBoard,
          currentPlayer,
          row,
          currentColumn
        );
        // <--

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
      if (!safeGuard) return state;
      const {
        tokenIndex,
        tokenList,
        gameOver,
        currentPlayer,
        me,
        opponent,
      } = state;
      if (!me || !opponent || !currentPlayer || gameOver) return state;
      const nextPlayer = currentPlayer === me.id ? opponent.id : me.id; // update the next player
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
      // TODO: gotta add the tag and id to the payload
      const { name, tag, id } = action.payload;
      const me = { name, wins: 0, tag, id };
      return { ...state, me };
    }
    case RESTART: {
      const { currentPlayer, me, opponent } = state;
      if (!me || !opponent || !currentPlayer) return state;
      const board = initializeBoard(7, 6);
      let _player1, _player2: Player;
      let _currentPlayer: string;
      let tokens: TokenObject[];

      if (currentPlayer === me.id) {
        // Current player won and should play first, add a win to the score too
        _player1 = { ...me, wins: me.wins + 1 };
        _player2 = opponent;
        _currentPlayer = _player1.id;
        tokens = initializeTokens(_player1.tag, _player2.tag);
      } else {
        _player1 = me;
        _player2 = { ...opponent, wins: opponent.wins + 1 };
        _currentPlayer = _player2.id;
        tokens = initializeTokens(_player2.tag, _player1.tag);
      }

      //TODO: update the number of wins
      return {
        ...state,
        tokenList: tokens,
        board,
        tokenOffset: 0,
        tokenIndex: 0,
        tokenTop: 0,
        currentColumn: 0,
        gameOver: false,
        me: _player1,
        opponent: _player2,
        currentPlayer: _currentPlayer,
      };
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

  function safeGuard() {
    const { me, opponent, currentPlayer } = state;
    return me && opponent && currentPlayer;
  }
}

export default function useGameReducer() {
  const initialState: GameState = {
    board: initializeBoard(7, 6),
    boardColumns: 7,
    boardRows: 6,
    currentColumn: 0,
    gameOver: false,
    gameReady: false,
    tokenIndex: 0,
    tokenList: initializeTokens("O", "X"),
    tokenOffset: 0,
    tokenTop: 0,
  };
  const [state, dispatch] = useReducer(gameReducer, initialState);

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

  const stateMyName = (name: string, id: string, tag: string) => {
    dispatch({ type: SET_NAME, payload: { name, id, tag } });
    socket.emit("createRoom", name);
  };

  const restartGame = () => {
    dispatch({ type: RESTART });
  };

  return { state, moveRight, moveLeft, dropToken, stateMyName, restartGame };
}

type Action = { type: "MOVE_RIGHT" } | { type: "MOVE_LEFT" } | { type: "DROP" };
