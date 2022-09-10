import { IconButton } from "@chakra-ui/button";
import React, { useState } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import {
  HStack,
  Text,
  VStack,
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

  // console.log("Navbar");
  return (
    <VStack px={{ lg: "30", md: "10", base: "5" }} w={"100%"}>
      <HStack h={"8vh"} minH={"16"} w={"100%"} justifyContent={"space-between"}>
        <Text w={"30%"}>SuperChat </Text>
        <HStack
          w={toggleSettings ? "250px" : "56px"}
          bg={"gray.200"}
          justifyContent={"end"}
          transition={"0.5s"}
          p={"2"}
          borderRadius={"full"}
          overflow={"hidden"}
        >
          <IconButton
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            bg={"White"}
            icon={<IoSunnyOutline />}
          />
          <IconButton
            borderRadius={"full"}
            colorScheme={"purple"}
            variant={"outline"}
            fontSize={"2xl"}
            bg={"White"}
            icon={<IoPersonOutline />}
          />
          <IconOpenModal btn={<IoTrashOutline />} />
          <IconButton
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
      </HStack>
    </VStack>
  );
}

export default Navbar;
