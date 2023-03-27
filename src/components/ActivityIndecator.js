import { Box } from "@chakra-ui/react";
import React from "react";

const ActivityIndecator = ({ isOnline }) => {
  return (
    <Box
      bg={isOnline ? "green.500" : "gray.400"}
      h={3}
      w={3}
      borderRadius={"full"}
    />
  );
};

export default ActivityIndecator;
