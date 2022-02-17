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
  me?: Player;
  opponent?: Player;
  currentPlayer?: string;
  gameReady: boolean;
  tokenIndex: number;
  tokenOffset: number;
  tokenTop: number;
  tokenList: TokenObject[];
  currentColumn: number;
}

declare interface GameContextType {
  state: GameState;
  dropToken: Function;
  moveRight: Function;
  moveLeft: Function;
  stateMyName: (name: string, id: string, tag: string) => {};
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
  id: string;
}
