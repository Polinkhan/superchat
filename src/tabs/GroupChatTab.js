import { ChevronDownIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Center, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { socket } from "../api/Client";
import ActivityIndecator from "../components/ActivityIndecator";
import UserButton from "../components/UserButton";
import { useDataContext } from "../contexts/DataContext";
import { Colors } from "../helpers/Colors";
import { timeDifference } from "../helpers/functions";

const GroupChatTab = () => {
  const data = { userid: 0, name: "Group Chat" };
  const { id } = useParams();
  const { Data, groupMessage } = useDataContext();
  const { Users, UserActivity } = Data;

  return (
    <Flex flex={1}>
      <VStack py={4} flex={1} h={"100%"} shadow={"base"}>
        <UserButton data={data} path={"/groupchat"} />
        <VStack p={4} w={"100%"} alignItems={"flex-start"}>
          <HStack w={"100%"} justifyContent={"space-between"}>
            <Text>User list</Text>
            <ChevronDownIcon />
          </HStack>
          <Divider />
          <VStack w={"100%"} alignItems={"flex-start"} gap={2}>
            {Object.keys(Users).map((key, i) => (
              <HStack w={"100%"} key={i} justifyContent={"space-between"}>
                <HStack>
                  <ActivityIndecator isOnline={UserActivity[key].isOnline} />
                  <Text>{Users[key]}</Text>
                </HStack>
                {!UserActivity[key].isOnline && (
                  <Text color={"gray"} fontSize={12}>{`${timeDifference(
                    UserActivity[key].left
                  )} ago`}</Text>
                )}
              </HStack>
            ))}
          </VStack>
        </VStack>
      </VStack>
      <VStack flex={3} h={"100%"} overflow={"auto"}>
        {!id && (
          <Center flex={0.8}>
            {
              <Text fontSize={"xl"} color={"gray.500"}>
                Select Group Chat to start conversation
              </Text>
            }
          </Center>
        )}
        <Outlet context={{ messages: groupMessage }} />
      </VStack>
    </Flex>
  );
};

export default GroupChatTab;
