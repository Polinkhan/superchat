import {
  Center,
  Flex,
  IconButton,
  Image,
  Input,
  Select,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Colors } from "../helpers/Colors";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { socket } from "../api/Client";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const Toast = useToast();
  // localStorage.removeItem("accounts");
  const [name, setName] = useState("");
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("accounts"))
  );
  const [selectedAccount, setSelectedAccount] = useState();
  const { currentUser, setCurrentUser } = useDataContext();
  const navigate = useNavigate();

  const { setColorMode } = useColorMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("register_me", name);
  };

  const handlePreviousSubmit = (e) => {
    e.preventDefault();
    if (selectedAccount) {
      socket.emit("join_me", JSON.parse(selectedAccount));
      localStorage.setItem("currentUser", selectedAccount);
      setCurrentUser(JSON.parse(selectedAccount));
    } else Toast({ title: "Select an account" });
  };

  useEffect(() => {
    setColorMode("light");
    if (currentUser) navigate("/", { replace: true });
  }, [currentUser]);

  return (
    <Flex
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={Colors.light.light}
    >
      <Flex
        h={500}
        w={800}
        bg={"white"}
        shadow={"lg"}
        display={{ base: "none", md: "flex" }}
      >
        <Center flex={1}>
          <Image src={"./images/loginBanner.jpg"} alt="Login image" />
        </Center>
        <VStack flex={1} justifyContent={"space-around"}>
          <VStack flex={0.2}>
            <Text fontSize={"2xl"}>Super Chat 2.0</Text>
            <Text color={"gray.400"} fontSize={"xs"}>
              Group Chat, Private Chat & Room Chat
            </Text>
          </VStack>
          {accounts ? (
            <>
              <VStack flex={0.4} justifyContent={"space-around"} as={"form"}>
                <Text>Login with your previous accounts</Text>
                <Select
                  placeholder="Select Account"
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  {Object.keys(accounts).map((key, i) => (
                    <option
                      key={i}
                      value={JSON.stringify({ id: key, name: accounts[key] })}
                    >
                      {accounts[key]}
                    </option>
                  ))}
                </Select>
                <IconButton
                  colorScheme={"teal"}
                  borderRadius={"full"}
                  size={"lg"}
                  type={"submit"}
                  icon={<ArrowForwardIcon boxSize={6} />}
                  onClick={handlePreviousSubmit}
                />
              </VStack>
              <Text
                fontSize={"sm"}
                color={"gray.600"}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => setAccounts(null)}
              >
                Login with new account ?
              </Text>
            </>
          ) : (
            <>
              <VStack flex={0.4} justifyContent={"space-around"} as={"form"}>
                <Text>Add your details to enter the chat</Text>
                <Input
                  value={name}
                  isRequired
                  placeholder="Username"
                  focusBorderColor="teal.500"
                  onChange={(e) => setName(e.target.value)}
                />
                <IconButton
                  colorScheme={"teal"}
                  borderRadius={"full"}
                  size={"lg"}
                  type={"submit"}
                  icon={<ArrowForwardIcon boxSize={6} />}
                  onClick={handleSubmit}
                />
              </VStack>
              <Text
                fontSize={"sm"}
                color={"gray.600"}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                onClick={() =>
                  setAccounts(JSON.parse(localStorage.getItem("accounts")))
                }
              >
                Login with existing account ?
              </Text>
            </>
          )}
          <Text color={"gray.400"} fontSize={"xs"}>
            @abusayedpolin
          </Text>
        </VStack>
      </Flex>
      <Flex
        h={300}
        w={300}
        bg={"white"}
        shadow={"lg"}
        display={{ md: "none" }}
        borderRadius={16}
      >
        <VStack h={"100%"} justifyContent={"center"}>
          <Text fontSize={12}>The Mobile Version is not available yet</Text>
          <Text fontSize={12}>Please try with desktop or Laptop</Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
