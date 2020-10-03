import socketIO from "socket.io-client";

const endpoint = "http://a458cbda0d82.ngrok.io";
const socket = socketIO.connect(endpoint);

export default socket;
