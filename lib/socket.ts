import socketIO from "socket.io-client";

const endpoint = "http://a21df71d72cb.ngrok.io";
const socket = socketIO.connect(endpoint);

export default socket;
