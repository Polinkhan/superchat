import { nanoid } from "nanoid";
import TextareaAutosize from "react-textarea-autosize";
import React, { useState, useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import { useClientContext } from "../contexts/ClientContext";
import {
  Box,
  HStack,
  Text,
  VStack,
  Tooltip,
  Avatar,
  AvatarBadge,
  IconButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  IoSend,
  IoChevronBack,
  IoEllipse,
  IoImageOutline,
  IoAttach,
  IoHappyOutline,
  IoAppsOutline,
} from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
// var patern = new RegExp(regex);
function ChatBox({ id, name }) {
  const { myId, setUserTab } = useClientContext();

  // const textBox = useMemo(
  //   () => <TextBox id={id} myId={myId} toggle={toggle} setToggle={setToggle} />,
  //   [id, myId, toggle, setToggle]
  // );
  // const messages = useMemo(() => <Messages id={id} myId={myId} />, [id, myId]);

  return (
    <VStack h={"100%"} w={"100%"} justifyContent={"space-between"}>
      {/* Header Section */}
      <HStack
        onClick={() => setUserTab(true)}
        height={"8%"}
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
      <VStack h={"60vh"} w={"100%"} justifyContent={"end"}>
        <Box p={4} w={"100%"} h={"100%"} boxShadow={"md"} borderRadius={10}>
          <Box
            id={"msg" + id}
            w={"100%"}
            h={"100%"}
            maxH={"100%"}
            overflowY={"scroll"}
            className={"msgBox"}
            scrollBehavior={"smooth"}
          >
            <Messages id={id} myId={myId} />
          </Box>
        </Box>
      </VStack>

      {/* MsgTypingArea Section */}
      <HStack height={"10%"} justifyContent={"end"} w={"100%"}>
        <TextBox id={id} myId={myId} />
      </HStack>
    </VStack>
  );
}

function Messages({ id, myId }) {
  const { users, massages } = useClientContext();
  const toast = useToast();

  function updateScroll() {
    var element = document.getElementById("msg" + id);
    element.scrollTop = element.scrollHeight;
  }

  function handleCopyMsg(msg) {
    navigator.clipboard.writeText(msg);
    toast({
      title: "Copied to Clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  useEffect(() => {
    updateScroll();
  }, [massages]); //eslint-disable-line

  return (
    <>
      {massages[id].map((user) => (
        <HStack
          key={nanoid()}
          w={"100%"}
          justifyContent={user.id === myId ? "end" : "start"}
          alignItems={"end"}
          p={2}
        >
          {/* User Logo */}
          <VStack display={user.id === myId ? "none" : "flex"}>
            <Tooltip
              label={"id : [ " + user.id + " ]"}
              fontSize={"12"}
              placement="top"
              aria-label="A tooltip"
              hasArrow
              bg="purple.200"
            >
              <Avatar size={"sm"} cursor={"pointer"}>
                <AvatarBadge
                  boxSize="1em"
                  bg={users[user.id] ? "green.500" : "gray.300"}
                />
              </Avatar>
            </Tooltip>
          </VStack>

          {/* User Name Msg SendTime */}
          <VStack maxW={"80%"} alignItems={"start"} cursor={"pointer"}>
            <Box px={"2"} mb={"-2"} w={"100%"}>
              {user.id === myId ? "" : user.name}
            </Box>
            <Box
              px={"4"}
              py={"2"}
              borderBottomLeftRadius={"md"}
              borderTopLeftRadius={"2xl"}
              borderTopRightRadius={"md"}
              borderBottomRightRadius={"2xl"}
              bg={"gray.200"}
              _hover={{
                bg: "gray.300",
              }}
              wordBreak={"break-all"}
              style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
              onClick={() => {
                handleCopyMsg(user.msg);
              }}
            >
              {user.msg}
            </Box>
          </VStack>
        </HStack>
      ))}
    </>
  );
}

function TextBox({ id, myId }) {
  const [text, setText] = useState("");
  const [submitKey, setSubmitKey] = useState({
    Enter: false,
    Shift: false,
  });
  const [toggle, setToggle] = useState(false);
  const { massages, setMassages } = useClientContext();
  const { socket } = useSocketContext();

  const icon_props = {
    cursor: "pointer",
    _hover: {
      color: "gray.800",
    },
  };

  function handleSubmission() {
    if (text !== "") {
      if (id === "group") socket.emit("send", text);
      else socket.emit("privateMsg", id, text);
      const newMassages = { ...massages };
      newMassages[id].push({ name: "Me", id: myId, msg: text });
      setMassages(newMassages);
      setToggle(false);
      setText("");
    }
    setSubmitKey({
      Enter: false,
      Shift: false,
    });
  }

  function handleChange(e) {
    if (submitKey.Enter && !submitKey.Shift) {
      handleSubmission();
    } else setText(e.target.value);
  }
  return (
    <>
      <HStack
        fontSize={"xl"}
        justifyContent={"space-around"}
        position={"relative"}
        color={"gray.600"}
      >
        <Text {...icon_props}>
          <IoImageOutline />
        </Text>
        <Text {...icon_props}>
          <IoAttach />
        </Text>
        <Text {...icon_props} onClick={() => setToggle(!toggle)}>
          <IoHappyOutline />
        </Text>
        <Text {...icon_props}>
          <IoAppsOutline />
        </Text>
      </HStack>
      <Textarea
        // fontSize={"sm"}
        size={"sm"}
        minH="unset"
        focusBorderColor="none"
        resize={"none"}
        value={text}
        maxRows={2}
        as={TextareaAutosize}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSubmitKey({
              Enter: true,
              Shift: e.shiftKey,
            });
          }
        }}
        border={"none"}
        bg={"#edf2f7"}
        borderRadius={10}
        w={"90%"}
        autoFocus
        onClick={() => setToggle(false)}
      />
      <IconButton
        size={"sm"}
        w={"5%"}
        onClick={() => handleSubmission(text)}
        icon={<IoSend />}
        borderRadius={10}
      />
      {toggle && (
        <Box position={"absolute"} zIndex={999} bottom={20} left={5}>
          <EmojiPicker
            onEmojiClick={(e) => setText(text + e.emoji)}
            lazyLoadEmojis
            width={"300px"}
            height={"300px"}
            searchDisabled
            suggestedEmojisMode={""}
            previewConfig={{
              showPreview: false,
            }}
          />
        </Box>
      )}
    </>
  );
}

export default ChatBox;
