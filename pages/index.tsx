import Head from "next/head";
import { useEffect } from "react";
import Board from "../components/Board";
import styles from "../styles/Home.module.css";
import useGameReducer from "game_logic/useGameReducer";
import { GameContext } from "game_logic/context";
import Welcome from "components/Welcome";
import socket from "lib/socket";
import Button from "components/Button";
import { GAME_ID, PLAYERS_DATA, STATUS, START_GAME } from "lib/variables";

const { Provider } = GameContext;

export default function Home() {
  const {
    state,
    moveRight,
    moveLeft,
    dropToken,
    stateMyName,
    restartGame,
  } = useGameReducer();
  subscribe();

  const { gameReady } = state;
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
          <title>Connect 4</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Welcome label="Name" />
        </main>
      </div>
    </Provider>
  );

  /**
   * Function to subscribe the socket to all the server events
   */
  function subscribe() {
    socket.on(GAME_ID, (gameid: string) => {
      // TODO: create url with this gameIDs
    });

    socket.on(PLAYERS_DATA, (players: ServerPlayer[]) => {
      // TODO: find out which player you are and add the opponent to the p2 instance
    });

    socket.on(STATUS, (msg: string) => {
      // TODO: handle these status
    });

    socket.on(START_GAME, () => {
      // TODO: make the game start
    });
  }
}
