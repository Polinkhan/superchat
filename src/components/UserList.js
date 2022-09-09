import {
  Box,
  VStack,
  useRadio,
  useRadioGroup,
  Text,
  Divider,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import React from "react";
import { useClientContext } from "../contexts/ClientContext";
import { IoPersonCircle } from "react-icons/io5";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const { setUserTab, setMsgTab } = useClientContext();

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  function handleClick() {
    setUserTab(false);
    setMsgTab(true);
  }

  return (
    <Box as="label" w={"100%"}>
      <input {...input} />
      <Box
        {...checkbox}
        px={"4"}
        mb={"2"}
        mx={"2"}
        display="flex"
        alignItems={"center"}
        cursor="pointer"
        h={"50px"}
        bg={"#f5f7fb"}
        borderRadius={"full"}
        _checked={{
          borderColor: "purple.500",
          color: "",
          fontWeight: "bold",
          bg: "purple.50",
        }}
        _focus={{
          boxShadow: "",
        }}
        onClick={handleClick}
      >
        <Avatar size={"sm"}>
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
        <Text pl={"2"}>{props.children}</Text>
      </Box>
      <Divider />
    </Box>
  );
}

function UserList() {
  // console.log("UserList");
  const { users, userTab } = useClientContext();
  const keys = [];
  Object.keys(users).forEach((key) => {
    keys.push(key);
  });

  function handleChange(v) {
    const btn = document.querySelector(".a" + v);
    btn.click();
  }

  const { getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "group",
    onChange: handleChange,
  });

  return (
    <VStack
      mx={"1"}
      py={"5"}
      bg={"white"}
      h={"90vh"}
      w={{ md: "350px", base: "100%" }}
      display={{ md: "flex", base: userTab ? "flex" : "none" }}
      borderRadius={"20"}
      // style={{ transition: ".2s all" }}
    >
      {keys.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {users[value]}
          </RadioCard>
        );
      })}
    </VStack>
  );
}

export default UserList;
