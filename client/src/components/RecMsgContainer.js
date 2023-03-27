import { Avatar, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Colors } from "../helpers/Colors";

const RecMsgContainer = ({ data }) => {
  const { name, message, time } = data;
  return (
    <HStack w={"100%"}>
      <Avatar size={"sm"} />
      <Flex w={"100%"} flexDirection={"column"} alignItems={"flex-start"}>
        <Text px={4} fontSize={12} color={"gray"}>
          {name}
        </Text>
        <Box
          px={4}
          py={3}
          minW={"10%"}
          maxW={"80%"}
          bg={Colors.light.light}
          borderBottomRightRadius={16}
          borderTopLeftRadius={16}
          fontSize={12}
          wordBreak={"break-all"}
          style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        >
          {/* <Text w={"100%"} textAlign={"center"}> */}
          {message}
          {/* </Text> */}
        </Box>
        <Text p={1} color={"gray"} fontSize={9}>
          {time}
        </Text>
      </Flex>
    </HStack>
  );
};

export default RecMsgContainer;
