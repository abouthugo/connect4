import { initializeBoard, initializeTokens } from "lib/utils";
import { createContext } from "react";

export const GameContext = createContext<GameContextType | null>(null);
