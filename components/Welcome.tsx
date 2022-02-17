import Button from "./Button";
import styles from "../styles/Welcome.module.scss";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "game_logic/context";

export default function Welcome({ label }: WelcomeProps) {
  const [name, setName] = useState("");
  const [focus, setFocus] = useState(false);
  const { stateMyName } = useContext(GameContext);

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (focus && e.key === "Enter") {
      stateMyName(name);
    }
  };

  const handleInstructions = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    alert("Sorry, this is still under development");
  };

  useEffect(() => {
    document.addEventListener("keypress", handleOnKeyDown);
    return () => {
      document.removeEventListener("keypress", handleOnKeyDown);
    };
  }, [focus, name]);

  const labelStyles =
    name.length < 1 && !focus
      ? `${styles.label}`
      : `${styles.label} ${styles.activated}`;

  return (
    <>
      <div className={styles.main_container}>
        <h1>Let's get the introductions out of the way.</h1>
        <div className={styles.input_container}>
          <label className={labelStyles}>{label}</label>
          <input
            value={name}
            name={label}
            id={label}
            className={styles.input}
            onChange={handleOnNameChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
        <Button type="primary" fullWidth onClick={() => stateMyName(name)}>
          Lets go!
        </Button>
      </div>
      <div className={styles.instructions}>
        <div className={styles.center}>
          <span>First time playing? </span>
          <a onClick={handleInstructions}>Instructions Here</a>
        </div>
      </div>
    </>
  );
  // TODO: overlay for step by step explanation of how the game works when the click "Instructions Here" link
}

interface WelcomeProps {
  label: string;
}
