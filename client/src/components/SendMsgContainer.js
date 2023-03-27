import { Avatar, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const SendMsgContainer = ({ data }) => {
  const { name, message, time } = data;
  return (
    <Flex w={"100%"} flexDirection={"column"} alignItems={"end"}>
      <Box
        p={4}
        minW={"10%"}
        maxW={"80%"}
        bg={"gray.200"}
        borderBottomLeftRadius={16}
        borderTopRightRadius={16}
        wordBreak={"break-all"}
        style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        fontSize={12}
        textAlign={"center"}
      >
        {/* <Text w={"100%"} textAlign={"center"}> */}
        {message}
        {/* </Text> */}
      </Box>
      <Text p={1} color={"gray"} fontSize={9}>
        {time}
      </Text>
    </Flex>
  );
};

export default SendMsgContainer;
