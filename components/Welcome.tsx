import Button from "./Button";
import styles from "../styles/Welcome.module.scss";
import { useContext, useState } from "react";
import { GameContext } from "game_logic/context";

export default function Welcome({ label }: WelcomeProps) {
  const [name, setName] = useState("");
  const [focus, setFocus] = useState(false);
  const { stateMyName } = useContext(GameContext);

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const labelStyles =
    name.length < 1 && !focus
      ? `${styles.label}`
      : `${styles.label} ${styles.activated}`;

  return (
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
  );
}

interface WelcomeProps {
  label: string;
}
