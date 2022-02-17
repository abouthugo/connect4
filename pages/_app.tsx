import "../styles/globals.css";
import { AppProps } from "next/app";
import { GameContext } from "game_logic/context";
import useGameReducer from "game_logic/useGameReducer";

const { Provider } = GameContext;
function MyApp({ Component, pageProps }: AppProps) {
  const {
    state,
    moveRight,
    moveLeft,
    dropToken,
    stateMyName,
    restartGame,
  } = useGameReducer();
  return (
    <Provider value={{ state, moveRight, moveLeft, dropToken, stateMyName }}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
