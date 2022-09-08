import { Box, HStack } from "@chakra-ui/layout";
import React from "react";
import MsgBox from "./MsgBox";
import Navbar from "./Navbar";
import UserList from "./UserList";

function Body() {
  return (
    <Box
      bg={"#f5f7fb"}
      h={"100vh"}
      w={"100vw"}
      px={{ md: "10", base: "0" }}
      overflow={"hidden"}
    >
      <Navbar />
      <HStack>
        <UserList />
        <MsgBox />
      </HStack>
    </Box>
  );
}

export default Body;
