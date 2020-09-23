import { useContext, useState } from "react";
import { motion } from "framer-motion";
import styles from "styles/Token.module.css";
import { GameContext } from "./context";

// From Framer Motion example
const transition = {
  top: {
    ease: easeOutBounce,
    duration: 0.75,
  },
};

export default function Token({ player }: TokenProps) {
  const color = player === 0 ? "var(--p1)" : "var(--p2)";
  const { tokenOffset, tokenTop } = useContext(GameContext);
  return (
    <motion.div
      className={styles.token}
      style={{
        background: color,
        left: tokenOffset,
        top: tokenTop,
      }}
      animate={{ top: tokenTop, left: tokenOffset }}
      transition={transition}
      initial={false}
    />
  );
}

interface TokenProps {
  player: number;
}

function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}
