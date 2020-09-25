import { GameContext } from "game_logic/context";
import { useContext } from "react";
import styles from "../styles/Board.module.css";
import Token from "./Token";

const spaceBetween = 76;
const rows = 7;
const columns = 7;
const radius = 30;
const startX = 38;
const startY = 38;

export default function Board() {
  const { state } = useContext(GameContext);
  const tokenList = state.tokenList;
  return (
    <div className={styles.game_scene}>
      <div className={styles.play_area}>
        {/* Left Leg */}
        <div className={`${styles.stand_container} ${styles.left}`}>
          <div className={styles.stand_leg} />
          <div className={styles.stand_foot} />
          <div className={`${styles.stand_attachment} ${styles.left}`} />
        </div>

        {/* Where the tokens are */}
        <div className={styles.game_board_underlay}>{renderTokenList()}</div>

        {/* Where the spaces are */}
        <svg className={styles.game_board}>
          <defs>
            <mask x="0" y="0" width="548" height="472" id="mask">
              <rect x="0" y="0" width="548" height="472" fill="white" />
              {getEmptySpaces()}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="548"
            height="472"
            mask="url(#mask)"
            fillOpacity="1"
            fill="var(--green-3)"
          />
        </svg>

        {/* Right Leg */}
        <div className={`${styles.stand_container} ${styles.right}`}>
          <div className={styles.stand_leg} />
          <div className={styles.stand_foot} />
          <div className={`${styles.stand_attachment} ${styles.right}`} />
        </div>
      </div>
    </div>
  );

  /**
   * Generates all the empty spaces in the board
   */
  function getEmptySpaces() {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        arr.push({
          cx: startX + spaceBetween * j,
          cy: startY + spaceBetween * i,
          id: `token-${i}-${j}`,
        });
      }
    }
    return arr.map((space) => {
      return (
        <circle
          cx={space.cx}
          cy={space.cy}
          r={radius}
          fill="black"
          stroke="none"
          id={space.id}
          key={space.id}
        />
      );
    });
  }

  function renderTokenList() {
    return tokenList.map((t, index) => (
      <Token
        offset={t.offset}
        playerTag={t.playerTag}
        top={t.top}
        active={t.active}
        key={`${index}-${t.playerTag}`}
      />
    ));
  }
}

interface BoardProps {
  tokenList: TokenObject[];
}
