import {
  useToast,
  Button,
  Input,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useClientContext } from "../contexts/ClientContext";
import { useSocketContext } from "../contexts/SocketContext";

function Auth() {
  // console.log("Auth");
  const [userNameInput, setUserNameInput] = useState("");
  const [hasData, setHasData] = useState(false);
  const { users, setRegister } = useClientContext();
  const { socket } = useSocketContext();
  const toast = useToast();

  useEffect(() => {
    if (users) setHasData(true);
  }, [users]);

  const makeToast = (title, descriptionn, status) => {
    toast({
      title: title,
      description: descriptionn,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  async function handleClick() {
    if (userNameInput.length > 3) {
      await socket.emit("new-user-joined", userNameInput);
      setRegister(true);
      makeToast("Welcome", "Signed in as " + userNameInput, "success");
    } else {
      makeToast(
        "Username too small",
        "Please set your username of 4 character or more",
        "error"
      );
    }
  }

  return (
    <Stack
      bg={"#9633ff"}
      height="100vh"
      w={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack
        bg={"#fff"}
        w={{ xl: "35%", lg: "50%", md: "60%", base: "90%" }}
        h={"70%"}
        p={"8"}
        borderRadius={"20"}
        boxShadow="dark-lg"
      >
        <HStack h={"20%"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Sign In
          </Text>
        </HStack>
        <HStack h={"40%"} w={{ sm: "50%", base: "80%" }}>
          <Input
            variant="flushed"
            value={userNameInput}
            placeholder="Enter Username"
            textAlign={"center"}
            onChange={(e) => setUserNameInput(e.target.value)}
          />
        </HStack>
        <HStack
          h={"20%"}
          w={{ sm: "50%", base: "80%" }}
          justifyContent={"space-around"}
        >
          <Button
            colorScheme={"red"}
            borderRadius={"full"}
            onClick={() =>
              makeToast(
                "Under development!!",
                "Google Sign in option is not available right now. please sign in as a guest",
                "warning"
              )
            }
          >
            Google
          </Button>
          <Button
            isLoading={!hasData}
            loadingText='Connecting'
            colorScheme={"purple"}
            variant={"outline"}
            onClick={handleClick}
            borderRadius={"full"}
            type={"submit"}
          >
            As Guest
          </Button>
        </HStack>
      </VStack>
    </Stack>
  );
}
export default Auth;
