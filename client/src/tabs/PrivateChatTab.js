import { Button, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import UserButton from "../components/UserButton";
import { Colors } from "../helpers/Colors";

const PrivateChatTab = () => {
  const Data = [
    { userid: "123", name: "Polin" },
    { userid: "456", name: "Pulak" },
    { userid: "789", name: "Naeem" },
    { userid: "147", name: "Eshita" },
  ];
  const { id } = useParams();
  return (
    <Flex flex={1}>
      <VStack py={4} flex={1} h={"100%"} shadow={"base"} gap={2}>
        {Data.map((data, i) => (
          <UserButton key={i} data={data} path={"/privatechat"} />
        ))}
      </VStack>
      <VStack flex={3} h={"100%"}>
        {!id && (
          <Center flex={0.8}>
            {
              <Text fontSize={"xl"} color={"gray.500"}>
                Select a chat to start new conversation
              </Text>
            }
          </Center>
        )}
        <Outlet context={{}} />
      </VStack>
    </Flex>
  );
};

export default PrivateChatTab;
