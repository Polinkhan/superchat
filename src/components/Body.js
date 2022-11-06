import { HStack, VStack, Center } from "@chakra-ui/layout";
import React from "react";
import MsgBox from "./MsgBox";
import Navbar from "./Navbar";
import UserList from "./UserList";

function Body() {
  return (
    <VStack
      h={"100vh"}
      justifyContent={"center"}
      bg={"#f0f2f5"}
      fontSize={"sm"}
    >
      <Navbar />
      <Center h={"92%"} w={"100%"}>
        <HStack
          m={"auto"}
          h={"90%"}
          w={"100%"}
          maxW={{ xl: "900px", "2xl": "1280px" }}
          px={{ sm: "10px", xl: "0px" }}
        >
          <UserList />
          <MsgBox />
        </HStack>
      </Center>
    </VStack>
  );
}

export default Body;
