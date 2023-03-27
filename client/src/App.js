import { ChakraProvider } from "@chakra-ui/react";
import RootRouter from "./routers/RootRouter";
import { extendTheme } from "@chakra-ui/react";
import Events from "./api/Events";
import { useEffect } from "react";
import DataContextProvider from "./contexts/DataContext";

const App = () => {
  const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
  };
  const theme = extendTheme({ config });
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <ChakraProvider theme={theme}>
        <DataContextProvider>
          <Events />
          <RootRouter />
        </DataContextProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
