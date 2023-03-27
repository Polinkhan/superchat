import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Colors } from "../helpers/Colors";

const UserButton = ({ data, path }) => {
  const { userid, name, isActive, lastMassage } = data;
  const { id } = useParams();
  const current = userid == id;
  return (
    <Link to={`${path}/${userid}`} style={{ width: "100%" }}>
      <HStack
        p={4}
        w={"100%"}
        h={16}
        bg={current ? Colors.light.normal : Colors.light.light}
        _hover={{ borderLeftWidth: 20 }}
      >
        <Text>{name}</Text>
      </HStack>
    </Link>
  );
};

export default UserButton;
