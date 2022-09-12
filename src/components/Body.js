import { Box, HStack } from "@chakra-ui/layout";
import React from "react";
import MsgBox from "./MsgBox";
import Navbar from "./Navbar";
import UserList from "./UserList";

function Body() {
  return (
    <Box
      bg={"#f2efff"}
      h={"100vh"}
      w={"100vw"}
      px={{ md: "10", base: "0" }}
      // overflow={"hidden"}
    >
      <Navbar />
      <Box display={"flex"}>
        <UserList />
        <MsgBox />
      </Box>
    </Box>
  );
}

export default Body;
