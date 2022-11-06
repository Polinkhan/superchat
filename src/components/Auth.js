import {
  useToast,
  Button,
  Input,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useClientContext } from "../contexts/ClientContext";
import { useSocketContext } from "../contexts/SocketContext";

function Auth() {
  const [userNameInput, setUserNameInput] = useState("");
  const { users, setRegister } = useClientContext();
  const { socket } = useSocketContext();
  const toast = useToast();

  const makeToast = (title, descriptionn, status) => {
    toast({
      title: title,
      description: descriptionn,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  async function handleClick(e) {
    e.preventDefault();
    await socket.emit(
      "new-user-joined",
      userNameInput === "" ? "Annonymous" : userNameInput
    );
    setRegister(true);
    makeToast("Welcome", "Signed in as " + userNameInput, "success");
  }

  return (
    <Stack
      bg={"#f0f2f5"}
      height="100vh"
      w={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack
        bg={"#fff"}
        w={"100%"}
        maxW={{ base: "400px", "2xl": "600px" }}
        h={"70%"}
        p={"8"}
        borderRadius={10}
        boxShadow="md"
        as={"form"}
        onSubmit={handleClick}
      >
        <HStack h={"20%"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Sign In
          </Text>
        </HStack>
        <HStack h={"40%"} w={"70%"} justifyContent={"space-around"}>
          <Input
            autoFocus
            variant="flushed"
            value={userNameInput}
            placeholder="Annonymous..."
            textAlign={"center"}
            onChange={(e) => setUserNameInput(e.target.value)}
          />
        </HStack>
        <Button
          px={12}
          isLoading={users ? false : true}
          loadingText="Connecting"
          onClick={handleClick}
          borderRadius={10}
          type={"submit"}
          colorScheme={"blue"}
          rounded={"full"}
        >
          Login
        </Button>
      </VStack>
    </Stack>
  );
}
export default Auth;
