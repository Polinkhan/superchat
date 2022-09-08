import { IconButton } from "@chakra-ui/button";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import TextareaAutosize from "react-textarea-autosize";
import React, { useState, useEffect, useRef } from "react";
import {
  IoSendSharp,
  IoChevronBack,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useSocketContext } from "../contexts/SocketContext";
import { nanoid } from "nanoid";
import { useClientContext } from "../contexts/ClientContext";

function ChatBox({ id, name }) {
  const [text, setText] = useState("");
  const { massages, setMassages, myId, setUserTab, setMsgTab } =
    useClientContext();
  const { socket } = useSocketContext();
  const textEndRef = useRef();

  const scrollToBottom = () => {
    textEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [massages]);

  function handleSubmission() {
    if (id === "group") socket.emit("send", text);
    else socket.emit("privateMsg", id, text);
    const newMassages = { ...massages };
    newMassages[id].push({ name: "Me", id: myId, msg: text });
    setMassages(newMassages);
    setText("");
  }

  function Msg({ user }) {
    const userId = user.id;
    return (
      <HStack
        w={"100%"}
        p={"2"}
        justifyContent={userId === myId ? "end" : "start"}
        alignItems={"end"}
      >
        {/* User Logo */}
        <VStack display={user.name === "Me" ? "none" : "flex"}>
          <IconButton
            icon={<IoPersonCircleOutline />}
            bg={"none"}
            fontSize={"4xl"}
          />
        </VStack>

        {/* User Name Msg SendTime */}
        <VStack maxW={"80%"} alignItems={"start"}>
          <Box px={"2"} mb={"-2"} w={"100%"}>
            {user.name}
          </Box>
          <Box
            px={"4"}
            py={"2"}
            borderTopLeftRadius={"md"}
            borderTopRightRadius={"2xl"}
            borderBottomLeftRadius={"2xl"}
            borderBottomRightRadius={"md"}
            bg={user.name === "Me" ? "gray.200" : "purple.100"}
            wordBreak={"break-all"}
            style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          >
            {user.msg}
          </Box>
        </VStack>
      </HStack>
    );
  }

  function handleBack() {
    setUserTab(true);
    setMsgTab(false);
  }
  return (
    <VStack h={"100%"} w={"100%"}>
      {/* Header Section */}
      <HStack height={"7%"} w={"100%"} borderBottom={"1px solid #dddddd"}>
        <IconButton
          variant={"outline"}
          borderRadius={"50%"}
          icon={<IoChevronBack />}
          onClick={handleBack}
          display={{ md: "none", base: "flex" }}
        />
        <Text>{name}</Text>
      </HStack>

      {/* MsgSeenArea Section */}
      <VStack height={"85%"} w={"100%"} justifyContent={"end"}>
        <Box w={"100%"} overflowY={"scroll"} className={"msgBox"}>
          {massages[id].map((m) => (
            <Msg key={nanoid()} user={m} />
          ))}
          <div ref={textEndRef} />
        </Box>
      </VStack>

      {/* MsgTypingArea Section */}
      <HStack height={"8%"} w={"100%"}>
        <Textarea
          minH="unset"
          focusBorderColor="none"
          resize={"none"}
          value={text}
          maxRows={2}
          as={TextareaAutosize}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <IconButton onClick={handleSubmission} icon={<IoSendSharp />} />
      </HStack>
    </VStack>
  );
}

export default ChatBox;
