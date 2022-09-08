import { IconButton } from "@chakra-ui/button";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { IoOptionsOutline, IoSunnyOutline } from "react-icons/io5";

function Navbar() {
  // console.log("Navbar");
  return (
    <VStack px={{ lg: "30", md: "10", base: "5" }}>
      <HStack h={"8vh"} w={"100%"}>
        <Text w={"30%"}>SuperChat </Text>
        <HStack w={"70%"} justifyContent={"end"}>
          <IconButton
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            icon={<IoOptionsOutline />}
          />
          <IconButton
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            icon={<IoSunnyOutline />}
          />
        </HStack>
      </HStack>
      <HStack></HStack>
    </VStack>
  );
}

export default Navbar;
