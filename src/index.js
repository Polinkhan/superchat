import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ClientContextProvider from "./contexts/ClientContext";
import { ChakraProvider } from "@chakra-ui/react";
import SocketContextProvoder from "./contexts/SocketContext";
import EventHandler from "./event/EventHandler";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketContextProvoder>
    <ClientContextProvider>
      <ChakraProvider>
        <EventHandler />
        <App />
      </ChakraProvider>
    </ClientContextProvider>
  </SocketContextProvoder>
);
