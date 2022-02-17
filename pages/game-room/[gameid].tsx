import { GameContext } from "game_logic/context";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function GameRoom() {
  const router = useRouter();
  const context = useContext(GameContext);
  if (!context) return <h1>Uh Oh error</h1>;

  const state = context.state;
  const { me, opponent } = state;

  const { gameid } = router.query;

  if (!me)
    return <h1>I should check if this room exists first then render a form</h1>;
  if (!opponent)
    return <h1>Looks like ME is set up but your friend is not here yet.</h1>;
  return <h1>Well this still a work in progress</h1>;
}
