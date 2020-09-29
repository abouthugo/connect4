import { initializeBoard, initializeTokens } from "lib/utils";
import { createContext } from "react";

export const GameContext = createContext({
  state: {
    gameOver: false,
    boardColumns: 7,
    boardRows: 6,
    board: initializeBoard(7, 6),
    player1: {
      name: "",
      tag: "O",
      wins: 0,
    },
    player2: {
      name: "AI",
      tag: "X",
      wins: 0,
    },
    gameReady: false,
    currentPlayer: {},
    tokenIndex: 0,
    tokenOffset: 0,
    tokenTop: 0,
    tokenList: initializeTokens("O", "X"),
    currentColumn: 0,
  },
  dropToken: () => {},
  moveRight: () => {},
  moveLeft: () => {},
});
