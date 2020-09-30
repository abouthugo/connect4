import { MouseEvent } from "react";
import styles from "../styles/Button.module.scss";

export default function Button({
  children,
  type,
  disabled,
  onClick,
  fullWidth,
}: ButtonProps) {
  const classes: string[] = [];
  if (disabled) {
    classes.push(styles.disabled);
  } else {
    classes.push(styles.button);
    classes.push(styles[type]);
  }

  if (fullWidth) {
    classes.push(styles.full_width);
  }
  return (
    <a className={classes.join(" ")} onClick={clickHandler}>
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
  fullWidth: false,
  onClick: () => {},
};

interface ButtonProps {
  type: "primary" | "secondary" | "link";
  disabled: boolean;
  onClick: Function;
  children: React.ReactNode;
  fullWidth: boolean;
}
