import Head from "next/head";
import { useEffect } from "react";
import Board from "../components/Board";
import styles from "../styles/Home.module.css";
import useGameReducer from "game_logic/useGameReducer";
import { GameContext } from "game_logic/context";
import Welcome from "components/Welcome";
import socket from "lib/socket";

const { Provider } = GameContext;

export default function Home() {
  const {
    state,
    moveRight,
    moveLeft,
    dropToken,
    stateMyName,
  } = useGameReducer();
  socket.on("someevent", () => {
    console.log("event triggered");
  });
  const { currentPlayer, gameOver, gameReady } = state;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!state.gameOver && gameReady) {
      switch (e.key) {
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowDown":
          dropToken();
          break;
        default:
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  return (
    <Provider value={{ state, moveRight, moveLeft, dropToken, stateMyName }}>
      <div className={styles.container}>
        <Head>
          <title>Column {state.currentColumn}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {gameReady && (
            <>
              <h1 className={styles.title}>
                {gameOver
                  ? `${currentPlayer.name} wins!`
                  : `${currentPlayer.name} `}
              </h1>
              <Board />
            </>
          )}
          {!gameReady && <Welcome label="Name" />}

          {/* TODO: ask user for username */}
        </main>
      </div>
    </Provider>
  );
}
