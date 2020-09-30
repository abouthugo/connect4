import { MouseEvent } from "react";
import styles from "../styles/Button.module.css";

export default function Button({
  children,
  type,
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${styles.button} ${styles[type]} ${
    disabled ? "disabled" : ""
  }`;
  return (
    <a className={classes} onClick={clickHandler}>
      {children}
    </a>
  );

  function clickHandler(e: MouseEvent) {
    e.preventDefault();
    onClick(e);
  }
}

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
};

interface ButtonProps {
  type: "primary" | "secondary" | "link";
  disabled: boolean;
  onClick: Function;
  children: React.ReactNode;
}
