import { useContext, createContext } from "react";
import io from "socket.io-client";
const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

function SocketContextProvoder(props) {
  // const socket = io("http://localhost:8000");
  const socket = io("https://superchat-server.netlify.app/");
  const value = { socket };

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvoder;
