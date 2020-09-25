import { initializeBoard, initializeTokens } from "lib/utils";
import { createContext, FunctionComponent } from "react";

export const GameContext = createContext({
  state: {
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
  },
  dropToken: () => {},
  moveRight: () => {},
  moveLeft: () => {},
});
