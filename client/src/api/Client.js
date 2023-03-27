import io from "socket.io-client";

const socket = io.connect("https://api.polinkhan.xyz");

export { socket };
