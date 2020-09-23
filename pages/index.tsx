import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Board from "../components/Board";
import Token from "../components/Token";
import styles from "../styles/Home.module.css";
import { GameContext } from "../components/context";

const { Provider } = GameContext;

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [tokenTop, setTokenTop] = useState(-50);

  const handleMoveRight = () => {
    if (offset < 456) setOffset(offset + 76);
  };

  const handleMoveLeft = () => {
    if (offset > 0) setOffset(offset - 76);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        handleMoveRight();
        break;
      case "ArrowLeft":
        handleMoveLeft();
        break;
      case "ArrowDown":
        // TODO: replace the number "5" with the next available row in the game
        setTokenTop(0 + 76 * 5);
        break;
      case "ArrowUp":
        setTokenTop(-50);
      default:
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Provider
      value={{
        tokenOffset: offset,
        tokenTop,
        moveLeft: handleMoveLeft,
        moveRight: handleMoveRight,
      }}
    >
      <div className={styles.container}>
        <Head>
          <title>Offset {offset}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Connect 4!</h1>
          <Board token={<Token player={0} />} />
        </main>
      </div>
    </Provider>
  );
}
