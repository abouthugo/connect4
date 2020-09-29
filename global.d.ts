declare namespace JSX {
  interface IntrinsicElements {
    Token: any;
  }
}

declare interface GameState {
  gameOver: boolean;
  boardColumns: number;
  boardRows: number;
  board: string[][];
  player1: Player;
  player2: Player;
  currentPlayer: Player;
  gameReady: boolean;
  tokenIndex: number;
  tokenOffset: number;
  tokenTop: number;
  tokenList: TokenObject[];
  currentColumn: number;
}

declare interface TokenObject {
  active: boolean;
  top: number;
  offset: number;
  playerTag: string;
}

declare interface Player {
  name: string;
  tag: string;
  wins: number;
}
