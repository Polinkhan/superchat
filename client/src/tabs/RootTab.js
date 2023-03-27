import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  StackDivider,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Colors } from "../helpers/Colors";
import { IoLogOutOutline } from "react-icons/io5";
import { useDataContext } from "../contexts/DataContext";
import { socket } from "../api/Client";

const RootTab = () => {
  const { setCurrentUser, Data } = useDataContext();

  const handleLogOut = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const accounts = JSON.parse(localStorage.getItem("accounts")) || {};
    accounts[user.id] = user.name;
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    socket.emit("logout", user);
  };

  return (
    <Center h={"100vh"} bg={Colors.light.normal}>
      <Flex
        h={600}
        w={1000}
        shadow={"xl"}
        bg={"white"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <HStack w={"100%"} flex={1} shadow={"md"} divider={<StackDivider />}>
          <Center flex={1} fontWeight={"bold"}>
            SUPER CHAT 2.0
          </Center>
          <HStack flex={2} justifyContent={"space-around"}>
            <Link to={"groupchat/0"}>
              <Text p={4} _hover={{ textDecoration: "underline" }}>
                Group Chat
              </Text>
            </Link>
            <Link to={"privatechat"}>
              <Text p={4} _hover={{ textDecoration: "underline" }}>
                Private Chat
              </Text>
            </Link>
            <Link to={"roomchat"}>
              <Text p={4} _hover={{ textDecoration: "underline" }}>
                Room Chat
              </Text>
            </Link>
          </HStack>
          <Center flex={1}>
            <Button
              colorScheme={"red"}
              variant={"outline"}
              rightIcon={<IoLogOutOutline size={18} />}
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </Center>
        </HStack>
        <Flex w={"100%"} flex={9} overflow={"auto"}>
          {Data && <Outlet />}
        </Flex>
      </Flex>
    </Center>
  );
};

export default RootTab;
