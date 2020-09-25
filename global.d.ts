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
  player1Tag: string;
  player2Tag: string;
  currentPlayer: string;
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
