import { LinkIcon } from "@chakra-ui/icons";
import { Box, Center, HStack, IconButton, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useOutletContext, useParams } from "react-router-dom";
import { socket } from "../api/Client";
import CustomTextArea from "../components/CustomTextArea";
import RecMsgContainer from "../components/RecMsgContainer";
import SendMsgContainer from "../components/SendMsgContainer";

const ChatBoxPage = () => {
  const messagesEndRef = useRef(null);
  const { messages } = useOutletContext();
  const { id, name } = JSON.parse(localStorage.getItem("currentUser"));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [text, setText] = useState("");
  const [submitKey, setSubmitKey] = useState({ Enter: false, Shift: false });

  const handleSubmission = () => {
    if (text) {
      const time = new Date().toLocaleTimeString();
      socket.emit("send_grp_msg", { id, name, time, message: text });
      setText("");
    }
    setSubmitKey({ Enter: false, Shift: false });
  };

  const handleChange = (e) => {
    if (submitKey.Enter && !submitKey.Shift) handleSubmission();
    else setText(e.target.value);
  };

  return (
    <VStack w={"100%"} flex={1} overflow={"auto"}>
      <VStack p={4} w={"100%"} flex={10} overflow={"auto"}>
        {messages?.map((data, i) =>
          id === data.id ? (
            <SendMsgContainer key={i} data={data} />
          ) : (
            <RecMsgContainer key={i} data={data} />
          )
        )}
        <div ref={messagesEndRef} />
      </VStack>
      <HStack p={2} w={"100%"} flex={1}>
        <Center flex={text ? 0 : 1} position={"relative"}>
          <HStack
            position={"absolute"}
            left={text ? 20 : 4}
            justifyContent={"space-around"}
          >
            <LinkIcon />
            <LinkIcon />
            <LinkIcon />
            <LinkIcon />
            <LinkIcon />
          </HStack>
        </Center>

        <HStack flex={5}>
          <CustomTextArea
            autoFocus
            value={text}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                setSubmitKey({ Enter: true, Shift: e.shiftKey });
            }}
          />
          <IconButton
            colorScheme={"teal"}
            variant={"outline"}
            borderRadius={999}
            icon={<IoSend size={16} />}
            onClick={handleSubmission}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ChatBoxPage;
