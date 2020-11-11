/**
 * This  file is for keeping track of the variables used between the server and the client to emit
 * and subscribe to events
 */

// Events emitted by server
export const GAME_ID = "game id"; // let player 1 know the gameId
export const STATUS = "status";
export const PLAYERS_DATA = "players data";
export const START_GAME = "start game";

// Events emitted by client
export const CREATE = "create room";
export const JOIN_GAME = "join game";
