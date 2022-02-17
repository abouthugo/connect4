import socketIO from "socket.io-client";

const endpoint = "http://87c2797bc918.ngrok.io";
const socket = socketIO(endpoint);

export default socket;
