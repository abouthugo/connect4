import Head from "next/head";
import { useEffect } from "react";
import Board from "../components/Board";
import styles from "../styles/Home.module.css";
import useGameReducer from "game_logic/useGameReducer";
import { GameContext } from "game_logic/context";

const { Provider } = GameContext;

export default function Home() {
  const { state, moveRight, moveLeft, dropToken } = useGameReducer();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!state.gameOver) {
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
    <Provider value={{ state, moveRight, moveLeft, dropToken }}>
      <div className={styles.container}>
        <Head>
          <title>Column {state.currentColumn}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            {state.gameOver ? "GAME OVER" : "Let's play connect 4!"}
          </h1>
          <Board />
        </main>
      </div>
    </Provider>
  );
}
