import { createContext } from "react";

export const GameContext = createContext({
  tokenOffset: 0,
  tokenTop: 0,
  moveLeft: () => {},
  moveRight: () => {},
});
