import { Box, VStack, useRadio, useRadioGroup, Text } from "@chakra-ui/react";
import React from "react";
import { useClientContext } from "../contexts/ClientContext";

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
        display="flex"
        alignItems={"center"}
        cursor="pointer"
        h={"60px"}
        borderLeftWidth={"3px"}
        borderColor={"#f5f7fb"}
        borderRadius={"3"}
        boxShadow={"md"}
        bg={"#f5f7fb"}
        _checked={{
          borderColor: "purple.500",
          color: "purple",
          fontWeight: "bold",
          bg: "purple.50",
        }}
        _focus={{
          boxShadow: "",
        }}
        onClick={handleClick}
      >
        <Text>{props.children}</Text>
      </Box>
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
      py={"5"}
      bg={"white"}
      h={"90vh"}
      w={{ md: "350px", base: userTab ? "100%" : "0%" }}
      fontSize={{ md: "md", base: userTab ? "sm" : "0%" }}
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
