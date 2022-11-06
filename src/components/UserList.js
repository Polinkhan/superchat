import {
  Box,
  VStack,
  Text,
  Divider,
  Avatar,
  AvatarBadge,
  HStack,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useClientContext } from "../contexts/ClientContext";

function UserList() {
  const { users, userTab, massages } = useClientContext();
  const param = useParams();
  const { id } = param;

  return (
    <VStack
      p={"3"}
      bg={"#ffffff"}
      h={"100%"}
      w={{ md: "350px", base: "100%" }}
      display={{ md: "flex", base: userTab ? "flex" : "none" }}
      borderRadius={10}
      boxShadow={"md"}
    >
      {Object.keys(users).map((user, i) => (
        <Box key={i} w={"100%"}>
          <Link to={"/" + user}>
            <HStack
              px={"4"}
              mb={"2"}
              display="flex"
              alignItems={"center"}
              cursor="pointer"
              h={"50px"}
              bg={id === user ? "#e4e6eb" : "#f0f2f5"}
              borderRadius={10}
              // onClick={handleClick}
            >
              <Avatar size={"sm"}>
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
              <Center pl={2} flexDirection={"column"} alignItems={"flex-start"}>
                <Text>{users[user]}</Text>
                <Text fontSize={"xs"}>
                  {massages[user].length
                    ? massages[user][massages[user].length - 1].msg
                    : ""}
                </Text>
              </Center>
            </HStack>
          </Link>
          <Divider />
        </Box>
      ))}
    </VStack>
  );
}

export default UserList;
