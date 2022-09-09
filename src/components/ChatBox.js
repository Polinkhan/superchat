import { IconButton } from "@chakra-ui/button";
import { Box, HStack, Text, VStack, Tooltip } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import TextareaAutosize from "react-textarea-autosize";
import React, { useState, useEffect, useRef } from "react";
import {
  IoSend,
  IoChevronBack,
  IoPersonCircle,
  IoEllipse,
  IoImageOutline,
  IoAttach,
  IoHappyOutline,
  IoAppsOutline,
} from "react-icons/io5";
import { useSocketContext } from "../contexts/SocketContext";
import { nanoid } from "nanoid";
import { useClientContext } from "../contexts/ClientContext";

function ChatBox({ id, name }) {
  // console.log("c");
  const { myId, setUserTab, setMsgTab } = useClientContext();
  const { socket } = useSocketContext();
  const textEndRef = useRef();

  const scrollToBottom = () => {
    textEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("Scroll");
  };

  function Messages() {
    const { massages } = useClientContext();
    useEffect(() => {
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }, [massages]);
    return (
      <>
        {massages[id].map((user) => (
          <HStack
            key={nanoid()}
            w={"100%"}
            p={"2"}
            justifyContent={user.id === myId ? "end" : "start"}
            alignItems={"end"}
          >
            {/* User Logo */}
            <VStack display={user.name === "Me" ? "none" : "flex"}>
              <Tooltip
                label={"id : [ " + user.id + " ]"}
                placement="top"
                aria-label="A tooltip"
                hasArrow
                bg="purple.200"
              >
                <IconButton
                  icon={<IoPersonCircle />}
                  bg={"none"}
                  color={"purple.900"}
                  fontSize={"4xl"}
                />
              </Tooltip>
            </VStack>

            {/* User Name Msg SendTime */}
            <VStack maxW={"80%"} alignItems={"start"}>
              <Box px={"2"} mb={"-2"} w={"100%"}>
                {user.name === "Me" ? "" : user.name}
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
        ))}
      </>
    );
  }

  function TextBox() {
    const [text, setText] = useState("");
    const { massages, setMassages } = useClientContext();

    function handleSubmission(text) {
      if (text !== "") {
        if (id === "group") socket.emit("send", text);
        else socket.emit("privateMsg", id, text);
        const newMassages = { ...massages };
        newMassages[id].push({ name: "Me", id: myId, msg: text });
        setMassages(newMassages);
      }
    }

    function handleChange(e) {
      const str = e.target.value;
      // submit if Enter Press
      if (str.charCodeAt(str.length - 1) !== 10) {
        setText(e.target.value);
      } else {
        handleSubmission(text);
      }
    }
    return (
      <>
        <HStack
          fontSize={"xl"}
          display={text === "" ? "flex" : "none"}
          justifyContent={"space-around"}
        >
          <Text cursor={"pointer"}>
            <IoImageOutline />
          </Text>
          <Text cursor={"pointer"}>
            <IoAttach />
          </Text>
          <Text cursor={"pointer"}>
            <IoHappyOutline />
          </Text>
          <Text cursor={"pointer"}>
            <IoAppsOutline />
          </Text>
        </HStack>
        <Textarea
          minH="unset"
          focusBorderColor="none"
          resize={"none"}
          value={text}
          maxRows={2}
          as={TextareaAutosize}
          onChange={handleChange}
          border={"none"}
          bg={"#edf2f7"}
          borderRadius={"full"}
          w={text === "" ? "90%" : "100%"}
          transition={"0.5s"}
          autoFocus
        />
        <IconButton
          w={"5%"}
          onClick={() => handleSubmission(text)}
          icon={<IoSend />}
          borderRadius={"full"}
        />
      </>
    );
  }

  function handleBack() {
    setUserTab(true);
    setMsgTab(false);
  }

  return (
    <VStack h={"100%"} w={"100%"}>
      {/* Header Section */}
      <HStack
        onClick={handleBack}
        height={"7%"}
        minH={"10"}
        w={"100%"}
        borderBottom={"1px solid #dddddd"}
        cursor={"pointer"}
        justifyContent={"space-between"}
      >
        <HStack display={{ md: "none", base: "flex" }} color={"gray"}>
          <IoChevronBack />
          <Text>back</Text>
        </HStack>
        <HStack px={"4"}>
          <IoEllipse fontSize={"10"} color="green" />
          <Text fontWeight={"bold"}>{name}</Text>
        </HStack>
      </HStack>

      {/* MsgSeenArea Section */}
      <VStack height={"85%"} w={"100%"} justifyContent={"end"}>
        <Box w={"100%"} overflowY={"scroll"} className={"msgBox"}>
          <Messages />
          <div ref={textEndRef} />
        </Box>
      </VStack>

      {/* MsgTypingArea Section */}
      <HStack
        height={{ md: "8%", base: "10%" }}
        minH={"15"}
        justifyContent={"end"}
        w={"100%"}
      >
        <TextBox />
      </HStack>
    </VStack>
  );
}

export default ChatBox;
