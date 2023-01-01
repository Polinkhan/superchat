import { IconButton } from "@chakra-ui/button";
import React, { useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import {
  HStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  PinInput,
  PinInputField,
  Center,
  Box,
  Link,
} from "@chakra-ui/react";
import {
  IoSettingsOutline,
  IoSunnyOutline,
  IoTrashOutline,
  IoPersonOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";

function IconOpenModal({ btn }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPinCorrect, setPinCOrrect] = useState(false);
  const { socket } = useSocketContext();
  function checkPin(val) {
    if (val === "1234") {
      setPinCOrrect(true);
    }
  }

  function handleSubmit() {
    setPinCOrrect(false);
    socket.emit("clearMsg");
    onClose();
  }

  return (
    <>
      <IconButton
        borderRadius={"full"}
        colorScheme={"purple"}
        variant={"outline"}
        fontSize={"2xl"}
        bg={"White"}
        size={"sm"}
        icon={btn}
        onClick={() => {
          onOpen();
          setPinCOrrect(false);
        }}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete All Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Enter Pin Code : //1234</Text>
            <br />
            <HStack w={"100%"} justifyContent={"center"}>
              <PinInput onComplete={checkPin}>
                <PinInputField autoFocus />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!isPinCorrect}
              colorScheme={"red"}
              mr={"4"}
              variant={"outline"}
              onClick={handleSubmit}
            >
              Confirm Delete
            </Button>
            <Button colorScheme={"red"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function Navbar() {
  const [toggleSettings, setToggleSettings] = useState(false);
  const [isSoundActive, setSoundActive] = useState(true);

  return (
    <HStack
      w={"100%"}
      h={"8%"}
      px={10}
      justifyContent={"space-between"}
      bg={"#ffffff"}
      boxShadow={"sm"}
    >
      <Text
        pl={5}
        fontSize={{ md: "2xl", base: "md" }}
        fontWeight={"bold"}
        color={"blackAlpha.700"}
      >
        SuperChat 2.0
      </Text>

      <HStack>
        <HStack
          w={toggleSettings ? "210px" : "48px"}
          bg={"white"}
          justifyContent={"end"}
          transition={"0.5s"}
          p={"2"}
          borderRadius={"full"}
          overflow={"hidden"}
        >
          <IconButton
            size={"sm"}
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            bg={"White"}
            icon={<IoSunnyOutline />}
          />
          <IconButton
            size={"sm"}
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            bg={"White"}
            icon={<IoPersonOutline />}
          />
          <IconOpenModal btn={<IoTrashOutline />} />
          <IconButton
            size={"sm"}
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            bg={"White"}
            icon={
              isSoundActive ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />
            }
            onClick={() => setSoundActive(!isSoundActive)}
          />
          <IconButton
            size={"sm"}
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            bg={"White"}
            icon={<IoSettingsOutline />}
            transform={toggleSettings ? "" : "rotate(90deg)"}
            transition={"0.5s"}
            onClick={() => {
              setToggleSettings(!toggleSettings);
            }}
          />
        </HStack>
        <Center alignItems={"self-start"} flexDirection={"column"}>
          <Text>Version : 2.0.4</Text>
          <Link
            href="https://github.com/Polinkhan/superchat_client"
            target={"_blank"}
          >
            Source Code
          </Link>
        </Center>
      </HStack>
    </HStack>
  );
}

export default Navbar;
